const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const lower = category.toLowerCase();
    const upper = lower.charAt(0).toUpperCase() + lower.substring(1);

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: `<:premio_cross:953933167713206372> No data found !`,
            type: 'editreply'
        }, interaction);

        const map = Object.keys(data.Roles)
            .map((value, index) => {
                const role = interaction.guild.roles.cache.get(data.Roles[value][0]);

                return `${data.Roles[value][1].raw} ‣ ${role}`;
            }).join("\n");

        const menu = new Discord.MessageSelectMenu()
            .setCustomId('reaction_select')
            .setPlaceholder('<:premio_cross:953933167713206372> Nothing selected')
            .setMinValues(1)

        var labels = [];

        const mapped = Object.keys(data.Roles).map((value, index) => {
            const role = interaction.guild.roles.cache.get(data.Roles[value][0]);

            const generated = {
                label: `${role.name}`,
                description: `Click To Get Or Remove ${role.name} Role`,
                emoji: data.Roles[value][1].raw,
                value: data.Roles[value][1].raw,
            }

            return labels.push(generated);
        }).join("\n");

        await menu.addOptions(labels);

        const row = new Discord.MessageActionRow()
            .addComponents(menu)

        client.embed({
            title: `${upper}`,
            desc: `${map}`,
            components: [row]
        }, channel).then((msg) => {
            data.Message = msg.id;
            data.save();
        })

        client.succNormal({ 
            text: "<:premio_tick:953933114533609492> Panel Created & Sent !",
            type: 'ephemeraledit'
        }, interaction);
    })
}

 