var tmi = require('tmi.js')
var oauth = require('./oauth.js') //This file is git.ignored.
var scrape = require('./scrape.js')

var options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "bothudsona",
    password: oauth.password
  },
  channels: ["#mrhuds0n", "#dodgepong", "#ffglive"]
}

var client = new tmi.client(options)

client.connect();

client.on("disconnected", (reason) => {
  console.log("Disconnected: "+reason)
})

client.on("chat", (channel, user, message, self) => {
  if(self) return

  //Checks if the bot is online.
  if(channel == "#mrhuds0n") {
    if(message == "~ping") {
      client.say(channel, "@"+user.username+": Pong.")
    }

    //Checks if the bot is online and responds to moderators.
    if(message == "~modping" && userstate.mod) {
      client.say(channel, "@"+user.username+": Modpong.")
    }

    if(message == "~broadping" && userstate.badges.broadcaster) {
      client.say(channel, "@"+user.username+": Broadpong.")
    }

    if(message.includes("~nrdb")) {
      card = message.trim().slice(6).trim()
      client.say(channel, "@"+user.username+": "+scrape.nrdb(card))
    }
  }
})
