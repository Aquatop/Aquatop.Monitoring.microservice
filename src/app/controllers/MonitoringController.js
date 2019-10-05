import Aquarium from '../schemas/Aquarium';

class MonitoringController {
  // async store() {}

  // async update() {}

  async index(req, res) {
    const { name } = req.params;

    const aquarium = await Aquarium.findOne({ name });

    return res.json(aquarium);
  }
}

export default new MonitoringController();
