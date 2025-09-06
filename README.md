# Commands

- Start Zookeper Container and expose PORT 2181.

```docker
docker run -p 2181:2181 zookeeper
```

- Start Kafka Container, expose PORT 9092 and setup ENV variables.

```docker
docker run -p 9092:9092 \
  -e KAFKA_PROCESS_ROLES=broker,controller \
  -e KAFKA_NODE_ID=1 \
  -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
  -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  -e KAFKA_LOG_DIRS=/tmp/kraft-combined-logs \
  -e CLUSTER_ID=abcdefghijklmnopqrstuvwx \
  confluentinc/cp-kafka:latest
```

### PRIVATE_IP = Your system IP

#### Window

```bash
ipconfig
```

### Linux

```bash
ip addr show
```

## Output

![image](./src/image/image.png)
