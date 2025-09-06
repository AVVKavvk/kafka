import { KAFKA_RIDER_TOPIC, KAFKA_RIDER_TOPIC_PARTITION } from "./constant.js";
import { kafka } from "./client.js";

async function init() {
  try {
    const admin = kafka.admin();

    console.log("Connecting to Kafka Admin");
    await admin.connect();

    console.log("Connected to Kafka Admin");

    console.log("Creating topic");
    await admin.createTopics({
      topics: [
        {
          topic: KAFKA_RIDER_TOPIC,
          numPartitions: KAFKA_RIDER_TOPIC_PARTITION,
          replicationFactor: 1,
        },
      ],
    });

    console.log("Topic created");
    await admin.disconnect();
  } catch (error) {
    console.log(error);
  }
}

init();
