const { MessageEmbed } = require('discord.js');
const db = require('../../schema/prefix.js');
module.exports = {
    name: 'setprefix',
    category: 'Settings',
    description: 'Set Custom Prefix',
    args: false,
    usage: '',
    aliases: ['prefix'],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const data = await db.findOne({ Guild: message.guildId });
        const pre = await args.join(' ');

        if (!pre[0]) {
            const embed = new MessageEmbed()
                .setDescription('Please give the prefix that you want to set!')
                .setColor(client.embedColor);
            return message.reply({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 6000) }).catch(() => { });
        }
        if (pre[1]) {
            const embed = new MessageEmbed()
                .setDescription('You can not set prefix a double argument')
                .setColor(client.embedColor);
            return message.reply({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }
        if (pre[0].length > 3) {
            const embed = new MessageEmbed()
                .setDescription('You can not send prefix more than 3 characters')
                .setColor(client.embedColor);
            return message.reply({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }
        if (data) {
            data.oldPrefix = prefix;
            data.Prefix = pre;
            await data.save();
            const update = new MessageEmbed()
                .setDescription(`Your prefix has been updated to **${pre}**`)
                .setColor(client.embedColor);
            return message.reply({ embeds: [update] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        } else {
            const newData = new db({
                Guild: message.guildId,
                Prefix: pre,
                oldPrefix: prefix,
            });
            await newData.save();
            const embed = new MessageEmbed()
                .setDescription(`Custom prefix in this server is now set to **${pre}**`)
                .setColor(client.embedColor);
            return message.reply({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }
    },
};