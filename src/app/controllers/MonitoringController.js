import { CompressionTypes } from 'kafkajs';

import Aquarium from '../schemas/Aquarium';

class MonitoringController {
  async store(req) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      aquarium.ph = req.body.ph;
      aquarium.waterLevel = req.body.waterLevel;
      aquarium.temperature = req.body.temperature;

      aquarium.save();

      return { aquarium, result: 'Aquarium already exists, updated!' };
    }

    const newAquarium = await Aquarium.create({ ...req.body, name });

    return { newAquarium, result: 'Aquarium created!' };
  }

  async update(req) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    if (aquarium) {
      aquarium.ph = req.body.ph;
      aquarium.waterLevel = req.body.waterLevel;
      aquarium.temperature = req.body.temperature;

      const updatedAquarium = await aquarium.save();

      return { updatedAquarium, result: 'Aquarium updated!' };
    }

    return { result: 'Aquarium not found!' };
  }

  async index(req, res) {
    const { name } = req.params;

    const checkAquarium = await Aquarium.findOne({ name });

    if (!checkAquarium) {
      return res.json({ error: 'Aquarium not found!' });
    }

    const message = { type: 'REQUEST_REPORT', aquarium: name };

    await req.producer.send({
      topic: 'monitoring-websocket',
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }],
    });

    const sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    await sleep(11000);

    const aquarium = await Aquarium.findOne({ name });

    return res.json(aquarium);
  }
}

export default new MonitoringController();
