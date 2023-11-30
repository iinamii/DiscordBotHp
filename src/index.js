// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
let griffindorPoints = 0;
let hufflepuffPoints = 0;
let slytherynPoints = 0;
let ravenclawPoints = 0;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  readyClient.on(Events.MessageCreate, (message) => {
    const isProfessor = message.member.roles.cache.some(
      (role) => role.name == "Professor"
    );
    if (!isProfessor) return;
    let words = message.content.split(" ");
    let points = parseInt(words[0]);
    let direction = words[2];
    let house = (words[3] || "").toLowerCase();
    if (!Number.isInteger(points)) return;
    if (words[1] != "points") return;
    if (house == "griffindor") {
      if (direction == "to") {
        griffindorPoints = griffindorPoints + points;
      } else if (direction == "from") {
        griffindorPoints = griffindorPoints - points;
      }
    }
    if (house == "ravenclaw") {
      if (direction == "to") {
        ravenclawPoints = ravenclawPoints + points;
      } else if (direction == "from") {
        ravenclawPoints = ravenclawPoints - points;
      }
    }
    if (house == "hufflepuff") {
      if (direction == "to") {
        hufflepuffPoints = hufflepuffPoints + points;
      } else if (direction == "from") {
        hufflepuffPoints = hufflepuffPoints - points;
      }
    }
    if (house == "slytheryn") {
      if (direction == "to") {
        slytherynPoints = slytherynPoints + points;
      } else if (direction == "from") {
        slytherynPoints = slytherynPoints - points;
      }
    }
    console.log("griffindor: " + griffindorPoints);
    console.log("ravenclaw: " + ravenclawPoints);
    console.log("slytheryn: " + slytherynPoints);
    console.log("hufflepuff: " + hufflepuffPoints);
  });
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
