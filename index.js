const Discord=require('discord.js')
const User=require('./GetUser')
const Help=require('./GetHelp')
const Repo=require('./GetRepos')
const server=require('./server')
const client=new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready',()=>{
  console.log(`Logged in as ${client.user.tag}!`)
})

const methods=['To get a user profile \n command: gh.user-<username>\n','To get a certain repo \n command: gh.repos-<reponame>\n']

client.on('message',msg=>{
  if(msg.author.bot) return
  let text=msg.content
  if(text==='gh.help'){
    msg.reply(Help.help)
  }
  else if(text.substring(0,8)=='gh.user-'){
    User.getUser(text.substring(8)).then(reply=>{
      if(typeof reply==='string') msg.reply(reply)
      else{
        const {name,login,avatar_url,bio,html_url,followers,public_repos,following}=reply
        const embed=new Discord.MessageEmbed()
        .setTitle(`${name || login}`)
        .setDescription(`${bio || ''}`)
        .setImage(avatar_url)
        .setURL(`${html_url}`)
        .addFields(
            {name: 'Repos', value: `[${public_repos}](https://github.com/${login}?tab=repositories)`, inline: true},
            {name: 'Followers', value: `${followers}`, inline: true},
            {name: 'Following', value: `${following}`, inline: true},
         )
        msg.reply({embeds: [embed]})
      }
    })
  }
  else if(text.substring(0,9)==='gh.repos-'){
    Repo.getRepos(text.substring(9)).then(repos=>{
      // console.log(repos)
      if(typeof repos==='string') msg.reply(repos)
      else{
        const embed=new Discord.MessageEmbed()
        .setTitle('Top repos')
        repos.forEach((repo,index)=>{
          embed.addField(`${index+1}`, `[${repo.full_name}](${repo.html_url})`)
        })
        msg.reply({embeds:[embed]})
      }
    })
  }
})

server.runBot()

client.login(process.env.TOKEN)