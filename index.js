const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});

require("dotenv").config();
const prefix = "?";

Client.on("ready", () => {
    
    console.log("bot opérationnel");
});

Client.login(process.env.BOT_TOKEN);

Client.on('messageCreate', message => {
    if (message.author.bot) return;

    // ?ping
    if (message.content === prefix + "ping"){
        message.reply("pong !");
    }

    // ?ro
    else if (message.content === prefix + "ro"){
        const roxmane = ["Ta geule ptn !!!!", "Chhhhhhh...", "Tssssssss c'est dingue ça :face_exhaling: :weary:"];
        const randomMessage = roxmane[Math.floor(Math.random() * roxmane.length)];

        message.channel.bulkDelete(1).then(message.channel.send("<@481048133900435476> " + randomMessage));
    }

    // ?help
    else if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setColor("#e51570")
            .setTitle("Liste des Commandes")
            .setURL("https://discord.js.org/")
            .setAuthor("Hugo Viaud", "https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj", "https://www.twitch.tv/altorru_tv/")
            .setThumbnail("https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj")
            .setDescription("Vous y trouverez la liste des commandes")
            .addField("__?help__", "Affiche cette liste de commandes")
            .addField("__?ping__", "Renvoie Pong")
            .addField("__?ro__", "Insulte aléatoirement Romane")
            .addField("__?clear <nombre de messages>__", "Supprime un nombre de messages défini")
            .setTimestamp()
            .setFooter("Ce bot appartient à son créateur", "https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj");

        message.channel.send({ embeds: [embed]});
    }
    // ?clear
    else if (message.member.permissions.has("MANAGE_MESSAGES")){
        if (message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if (args[1] == undefined){
                message.reply("Nombre de messages non ou mal défini.")
            }
            else {
                let number = parseInt(args[1]);

                if (isNaN(number)){
                    message.reply("Nombre de messages non ou mal défini.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Supression de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
});