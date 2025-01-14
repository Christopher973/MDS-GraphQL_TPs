const gameOfThronesApi = require("./gameOfThronesApi");

export default class Continents {
  async getAllContinents() {
    const continents = await gameOfThronesApi.get("/Continents");
    return Array.isArray(continents.data)
      ? continents.data.map((continent) => this.continentReducer(continent))
      : [];
  }

  async getContinentById(id) {
    const continents = await gameOfThronesApi.get(`/Continents/${id}`);
    return this.continentReducer(continents.data);
  }

  continentReducer(continent) {
    return {
      id: continent.id || 0,
      name: continent.name,
    };
  }
}
