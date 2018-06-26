const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

let ticketCount = JSON.parse(fs.readFileSync("./ticketCount.json", "utf8"));

module.exports.run = async (bot, message, args) => {
      let openReason = args.join(" ");
      if(!openReason) {
        //openReason = "Reason wasn't given!"
        return
        let invalidembed = new Discord.RichEmbed()
          .addField("**Invalid Form!**", "--> You must provide a reason to create a ticket channel!")
          message.channel.send(invalidembed);
      }
      let support = message.guild.roles.find(`name`, `${config.salesrep}`);
      if(!support){ // If "Support" DOES NOT exist, tell them to create it.
        message.channel.send(`Create a role named ${config.salesrep}`);
        } else { // If "Support" role exists, create ticket

        if(!ticketCount[message.guild.id]) ticketCount[message.guild.id]={ // If message.guild Ticket count doesn't exist, sets it to 0
          ticketCount: 0
        };

        ticketCount[message.guild.id].ticketCount++;
        let currentCount = "" + ticketCount[message.guild.id].ticketCount
        if(currentCount >= 1000) {
          currentCount = "" + ticketCount[message.guild.id].ticketCount
        } else if (currentCount >= 100) {
          currentCount = "0" + ticketCount[message.guild.id].ticketCount
        } else if (currentCount <= 9) {
          currentCount = "000" + ticketCount[message.guild.id].ticketCount
        } else {w
          currentCount = "00" + ticketCount[message.guild.id].ticketCount
        }

        let ticketCategory = message.guild.channels.find(`name`, "Tickets");
        let ticketReason = "Ticket was created by " + message.author.tag;
        message.guild.createChannel("ticket-" + currentCount, `text`, [ // Creates the ticket
            {
              id: message.guild.id,
              deny: ['VIEW_CHANNEL', 'MANAGE_MESSAGES']
            },
            {
              id: support.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES']

            },
            {
              id: message.author.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
        ], ticketReason).then(channel => {
          //

            let ticketChannel = message.guild.channels.find(`name`, "ticket-" + currentCount);
            ticketChannel.setParent("424642430026121216");
            let newTicketEmbed = new Discord.RichEmbed()
            .setTitle("Ticket - " + message.author.tag)
            .addField("Reason", openReason)
            .setColor(`${config.embedcolor}`)
            .setDescription(`Hello <@${message.author.id}>, \n\nThank you for creating an ticket!\n\nWe'll be with you in a few minutes. While you're waiting, please give us some information on your inquire. :thumbsup:`)
            .setTimestamp()
            .setFooter(config.footer);

            let anotherEmbed = new Discord.RichEmbed()
            .setDescription(`✅ | Your ticket has been created, ${message.author} | ${ticketChannel}`)
            .setColor(config.embedcolor)
            .setTimestamp()
            .setFooter(config.footer);
           message.channel.send(anotherEmbed);
          if(!ticketChannel) {
             return console.log("[Error] Ticket doesn't exist!");
           }
           ticketChannel.send(newTicketEmbed);
         })

        await fs.writeFile("./ticketCount.json", JSON.stringify(ticketCount), err =>{
          if (err) console.log(err)
        });

      }

}
module.exports.help = {
  name: "new"
}
