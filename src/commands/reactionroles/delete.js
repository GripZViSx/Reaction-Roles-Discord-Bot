const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: `<:premio_cross:953933167713206372> No data found for this name !`,
            type: 'editreply'
        }, interaction);

        var remove = await Schema.deleteOne({ Guild: interaction.guild.id, Category: category });

        client.succNormal({ 
            text: `<:premio_tick:953933114533609492> "**${category}**" successfully deleted !`,
            type: 'editreply'
        }, interaction);
    })
}

 