const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

// HANDLERS
  let rep = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let role = config.salesrep;
  let useRole = config.setreprole;
  let embed = new Discord.RichEmbed();
  let norepembed = new Discord.RichEmbed();

// CHECKERS
  if (!rep) {
    message.channels.sendMessage(`Please list a ${role}`);
    return;
  }
  if(!useRole && !role) {
    message.channels.sendMessage("Make sure you have filled out your configuration!");
    return;
  }

  if(!message.channel.name.includes(`ticket-`)) {
    message.channel.sendMessage("Error: This isn't an ticket channel!");
    return;
  }
  message.channel.overwritePermissions(rep.id,
    {
      'VIEW_CHANNEL': true,
      'SEND_MESSAGES': true
   },
   `${message.author.tag} set the Sales Rep to ${rep.tag}`);

// EMBED
   embed.setTitle(`${config.salesrep} set!`)
   embed.setDescription("This ticket now has a " + role)
   embed.addField("User", `${rep}`, true)
   embed.addField("By", `${message.author}`, true)
   embed.setColor(`${config.embedcolor}`)
   embed.setTimestamp()
   embed.setFooter(config.footer);

   message.channel.send(embed);
}

module.exports.help = {
  name: "setrep"
}
