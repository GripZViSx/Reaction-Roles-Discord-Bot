const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const reactions = await Schema.find({ Guild: interaction.guild.id });
    if (!reactions) return client.errNormal({ 
        error: `<:premio_cross:953933167713206372> No data found !`,
        type: 'editreply'
    }, interaction);
    
    let list = ``;

    for (var i = 0; i < reactions.length; i++) {
        list += `**Category ${i + 1} :-** ${reactions[i].Category} \n`;
    }

    await client.embed({
        title: "<a:diamondss:922169246723739668> Reaction Roles",
        desc: list,
        type: 'editreply'
    }, interaction)
}

 