import { kafka } from "./client.js";
import { KAFKA_RIDER_TOPIC } from "./constant.js";
const group = process.argv[2];

async function init() {
  try {
    const consumer = kafka.consumer({ groupId: group });

    console.log("Connecting to Kafka Consumer with group", group);
    await consumer.connect();
    await consumer.subscribe({ topic: KAFKA_RIDER_TOPIC, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `${group}: [${topic}]: PART:${partition}:`,
          message.value.toString()
        );
      },
    });
  } catch (error) {
    console.log(error);
  }
}

init();
