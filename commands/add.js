const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

// HANDLERS
  let friend = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let friendEmbed = new Discord.RichEmbed();
  let addedEmbed = new Discord.RichEmbed();

// IF NOT DEFINED
  if(!friend) {
    message.channel.send(`Please specify a user to add, ${message.author}`);
    return;
  }
  if (!message.channel.name.includes("ticket-")) {
    message.channel.send(`You must be in a ticket to do that, ${message.author}`);
    return;
  }

// CODE
  message.channel.overwritePermissions(friend.id,
    {
      'VIEW_CHANNEL': true,
      'SEND_MESSAGES': true
   },
   `${message.author.tag} invited ${friend.tag} to the ticket`);

// EMBED
   friendEmbed.setTitle("User Added!")
   friendEmbed.setDescription(`User: ${friend}\nBy: ${message.author}`)
   friendEmbed.setColor(`${config.embedcolor}`)
   friendEmbed.setTimestamp()
   friendEmbed.setFooter(config.footer);

   message.channel.send(friendEmbed);
}

module.exports.help = {
  name: "add"
}
