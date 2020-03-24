const discord = require('discord.js'); // "includes" the discord api
const config = require("dotenv"); // "includes" the config file for bot
const bot = new discord.Client(); // create a new bot instance

config.config({
    path: __dirname + "/.env"
})

bot.on('ready', () => {
    console.log('Bot is running');

    bot.user.setPresence({ // sets the "playing" status
        status: "online",
        activity: {
            name: "developing",
            type: "test huh"
        }
    })
})

bot.on('message', async message=>{
    const prefix = "!";

    if (message.author.bot || !message.guild || !message.content.startsWith(prefix))
    {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping")
    {
        const msg = await message.channel.send(`Pinging...`);

        msg.edit("Pong!")
    }

    if (cmd === "say")
    {
        if (message.deletable) message.delete();

        if (args.length < 1)
        {
            return message.reply("Nothing to say?").then(m => m.delete(5000));
        }

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.displayHexColor;

        if (args[0].toLowerCase() === "embed")
        {
            const embed = new discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setImage('https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg')
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
            
                message.channel.send(embed);
        }
        else
        {
            message.channel.send(args.join(" "));
        }
    }

    console.log(`${message.author.username}: ${message.content}`);
})

    

bot.login(process.env.TOKEN);