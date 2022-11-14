const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const role = interaction.options.getRole('role');
    const emoji = interaction.options.getString('emoji');

    const parsedEmoji = Discord.Util.parseEmoji(emoji);
    if (!parsedEmoji) return client.errNormal({
        error: `<:premio_cross:953933167713206372> Emoji not found in this server !`,
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (data) {
            data.Roles[emoji] = [
                role.id,
                {
                    id: parsedEmoji.id,
                    raw: emoji
                }
            ]

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id, Category: category }, data)
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Message: 0,
                Category: category,
                Roles: {
                    [emoji]: [
                        role.id,
                        {
                            id: parsedEmoji.id,
                            raw: emoji
                        }
                    ]
                }
            }).save();
        }

        client.succNormal({ 
            text: "<:premio_tick:953933114533609492> Reaction role successfully created !",
            type: 'editreply'
        }, interaction);
    })
}

 