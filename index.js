const Discord = require("discord.js");
const client = new Discord.Client();
const got = require("got");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if(message.content === "!automeme") {
     if (!message.member.hasPermission("ADMINISTRATOR")) {
  return message.reply("you don't have permission")
        }
     
 message.channel.send("🔄 **| AutoMeme Starting... (`Please wait 20s`)**").then((msg) => {
    setTimeout(function(){
    msg.edit("🔄 **| AutoMeme Starting... (`Please Wait 10s`)**")
   setTimeout(function(){
    msg.edit("✅ **| AutoMeme Started**")
    }, 10000)
   }, 10000)
   })  //edit the message to look cool
    setInterval(() => {
    got("https://www.reddit.com/r/memes/random/.json").then(response => {
    const [list] = JSON.parse(response.body);
    const [post] = list.data.children;

    const permalink = post.data.permalink;
    const memeUrl = `https://reddit.com${permalink}`;
    const memeImage = post.data.url;
    const memeTitle = post.data.title;
    const memeUpvotes = post.data.ups;
    const memeNumComments = post.data.num_comments;

    const embed = new Discord.MessageEmbed()
      .setTitle(`${memeTitle}`)  
      .setURL(`${memeUrl}`)
      .setColor("GREEN")
      .setImage(memeImage)
      .setFooter(`👍: ${memeUpvotes} | 💬: ${memeNumComments}`);

    message.channel.send(embed)
})
    }, 20000) //I recommend to put it above 20s to not abuse Discord Api lol

    }
});

client.login("YOUR BOT TOKEN");
