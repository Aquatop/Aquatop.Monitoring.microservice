import { Kafka, logLevel } from 'kafkajs';

import MonitoringController from '../app/controllers/MonitoringController';

class Communication {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'monitoring',
      brokers: ['localhost:9092'],
      logLevel: logLevel.WARN,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'monitoring-group' });

    this.run();
  }

  async run() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'websocket-monitoring' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Response: ', String(message.value));

        const payload = JSON.parse(message.value);
        const { type } = payload;

        let response = '';

        switch (type) {
          case 'UPDATE_AQUARIUM':
            response = await MonitoringController.update(payload);
            console.log(response);
            break;
          case 'CREATE_AQUARIUM':
            response = await MonitoringController.store(payload);
            console.log(response);
            break;
          default:
            console.log(`Message type ${type} is invalid!`);
            break;
        }
      },
    });
  }
}

export default new Communication().producer;
