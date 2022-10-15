const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});

require("dotenv").config();
const prefix = "?";

Client.on("ready", () => {
    Client.user.setStatus('available')
    Client.user.setActivity("son Maxi Fiak", {
        type: "STREAMING",
        url: "https://www.twitch.tv/altorru_tv"
      });

    console.log("bot opérationnel");
});

Client.login(process.env.BOT_TOKEN);

Client.on('messageCreate', message => {
    if (message.author.bot) return;

    // ?ping
    if (message.content === prefix + "ping"){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var ClientPing = Math.round(Client.pi);

            m.edit(`**:ping_pong: Pong! Le ping est de :**\n  ${ping}ms`);
        });
    }

    // ?voc
    if (message.content === prefix + "voc"){
        message.channel.send("@everyone Venez voc :microphone2: !!!");
    }

    // ?ro
    else if (message.content === prefix + "ro"){
        var roxmane = ["Ta geule ptn !!!!", "Chhhhhhh...", "Tssssssss c'est dingue ça :face_exhaling: :weary:"];
        const randomMessage = roxmane[Math.floor(Math.random() * roxmane.length)];

        message.channel.bulkDelete(1).then(message.channel.send("<@991802738264518687> " + randomMessage));
    }

    // ?bn
    else if (message.content === prefix + "bn"){
        message.channel.send("Bonne nuit @here de la part de " + "<@" + message.author.id + ">" + " :first_quarter_moon_with_face: :sparkles:");
    }

    // ?aprem
    else if (message.content === prefix + "aprem"){
        message.channel.send("@everyone Qui fait quoi cet aprèm les béboux demande " + "<@" + message.author.id + ">" + " ???");
    }

    // ?help
    else if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setColor("#e51570")
            .setTitle("Liste des Commandes")
            .setURL("https://www.twitch.tv/altorru_tv")
            .setAuthor("Hugo Viaud", "https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj", "https://www.twitch.tv/altorru_tv/")
            .setThumbnail("https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj")
            .setDescription("Vous y trouverez la liste des commandes")
            .addField("__?help__", "Affiche cette liste de commandes")
            .addField("__?ping__", "Renvoie la latence du bot")
            .addField("__?ro__", "Insulte aléatoirement Romane")
            .addField("__?clear <nombre de messages>__", "Supprime un nombre de messages défini")
            .addField("__?mute__", "Mute la personne de ton choix.")
            .addField("__?vocmute__", "Mute la personne de ton choix en vocal.")
            .addField("__?voc__", "Ping tout le monde pour dire de venir vocal.")
            .addField("__?bn__", "Souhaite bonne nuit a toutes les personnes présentes.")
            .addField("__?aprem__", "Demande à tous les béboux ce qu'ils font cet aprèm.")
            .setTimestamp()
            .setFooter("Ce bot appartient à son créateur", "https://yt3.ggpht.com/GWhviogzLJon8424eo7a1zzOSro8WlGBVIWczDrtLOZQPG4nVCcRFeXjlcKqTSqhJO2-hEspvQ=s88-c-k-c0x00ffffff-no-rj");

        message.channel.send({ embeds: [embed]});
    }
    // ?clear
    else if (message.member.permissions.has("SEND_MESSAGES")){
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
                    message.channel.bulkDelete(number+1).then(messages => {
                        console.log("Supression de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
    // ?ban
    else if (message.content.startsWith(prefix + "ban")){
        if (message.member.permissions.has("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if (mention == undefined){
                message.reply("Membre introuvable.")
            }
            else {
                if (mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès.");
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
    }
    // ?kick
    else if (message.content.startsWith(prefix + "kick")){
        if (message.member.permissions.has("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if (mention == undefined){
                message.reply("Membre introuvable.")
            }
            else {
                if (mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
    }

        // ?mute
    if (message.content.startsWith(prefix + 'mute')){
        if (message.member.permissions.has('MANAGE_ROLES')) {
            const role = message.guild.roles.cache.find(role => role.name === 'mute');
                const member = message.mentions.members.first();
                    member.roles.add("904420166652272721"); 
                    message.channel.send(member.displayName + ' a été mute avec succès.');

        } 
        else {
                message.channel.send("Vous n'avez pas la permission.")
        }     
    }

    // ?vocmute
    if (message.content.startsWith(prefix + 'vocmute')){
        if (message.member.permissions.has("MUTE_MEMBERS")) {
            const role = message.guild.roles.cache.find(role => role.name === 'vocmute');
                const member = message.mentions.members.first();
                    member.roles.add("904454521588187147"); 
                    message.channel.send(member.displayName + ' a été mute vocalement avec succès.');

        } 
        else {
                message.channel.send("Vous n'avez pas la permission.")
        }     
    }

});
