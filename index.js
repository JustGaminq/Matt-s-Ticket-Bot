const Discord = require("discord.js");
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Error: Mars couldn't find any commands to add!");
        return;
    }
    console.log("###################");
    console.log("#     Loading...  #");
    console.log("###################");
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} has loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Bot enable message
bot.on("ready", async () => {
  let setting = {
    msg: `${config.status}`,
    type: "Playing"
  }
    bot.user.setActivity(setting.msg, {type: setting.type});
    console.log("###################")
    console.log(`Set bot's activity to ` + `"${setting.type}` + " " + `${setting.msg}"`)
    console.log("###################")
    console.log("# Commands loaded #")
    console.log("###################")
    console.log(`#  ${bot.user.username} loaded! #`);
    console.log("###################")

  });
  // Bot DMs
  bot.on("message", async message => {
      if(message.author.bot) return;
      if(message.channel.type == "dm") return message.author.send("I cannot receive private messages. 😃");


  // Main constructors
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      if (!message.content.startsWith(prefix)) return;


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

});
bot.login(token);
