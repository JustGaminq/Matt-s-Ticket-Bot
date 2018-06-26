const Discord = require("discord.js");
const fs = require("fs");
const ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

// HANDLERS
  let currentCount = "" + ticketCount[message.guild.id].ticketCount
  let ticketCategory = message.guild.channels.find(`name`, "Tickets");
  let embed = new Discord.RichEmbed();
  let closedEmbed = new Discord.RichEmbed();

// CHECKERS
  if(!message.channel.name.includes(`ticket-`)) {
    message.channel.send("This is not a ticket channel!");
    return;

  } else {

// EMBEDS
    embed.setTitle(`Ticket - Closing`)
    embed.setColor(`${config.embedcolor}`)
    embed.setDescription("Closing your ticket in 5 seconds!")
    embed.setTimestamp()
    embed.setFooter(config.footer);
    message.channel.send(embed);
    setTimeout(function(){
      message.channel.delete("Ticket has been closed!");
    }, 5000);


  }
}
module.exports.help = {
  name: "close"
}
