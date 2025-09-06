import { kafka } from "./client.js";
import { KAFKA_RIDER_TOPIC, LOCATION_UPDATE_KEY } from "./constant.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  try {
    const producer = kafka.producer();

    console.log("Connecting to Kafka Producer");
    await producer.connect();

    console.log("Connected to Kafka Producer");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
      const [riderName, location] = line.split(" ");
      await producer.send({
        topic: KAFKA_RIDER_TOPIC,
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: LOCATION_UPDATE_KEY,
            value: JSON.stringify({ name: riderName, location }),
          },
        ],
      });
    }).on("close", async () => {
      await producer.disconnect();
    });
  } catch (error) {
    console.log(error);
  }
}

init();
