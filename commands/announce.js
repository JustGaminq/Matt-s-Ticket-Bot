const Discord = require("discord.js");
const config = require("../config.json");
const moment = require('moment');

module.exports.run = async (bot, message, args, member, guild, size, command) => {

    console.log(`[${message.author.tag}] [${message.author.id}] did command [announce.js]`)

    if (message.author.bot) return;

     message.delete();

     if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");

     let msg = args.join(" ");

     let errorEmbed = new Discord.RichEmbed()
     .setColor('#b70000')
     .setTitle('**ERROR!**')
     .setDescription("Please provide a message!")
     .setTimestamp()
     .setFooter(config.footer);

     if (!msg[1]) return message.channel.send(errorEmbed);

     let embed = new Discord.RichEmbed()
     .setColor("#4277f4")
     .setTitle("**Announcement**")
     .setDescription(msg)
     .setTimestamp()
     .setFooter(`Command Requested by ${message.author}`);
     return message.channel.send({ embed: embed});

};

module.exports.help = {
    name: "announce"
};
