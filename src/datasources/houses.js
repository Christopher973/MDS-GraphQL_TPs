// Définition des données dans une constante pour l'immutabilité
const HOUSES = [
  { id: 1, name: "House Stark", words: "Winter is Coming" },
  { id: 2, name: "House Targaryen", words: "Fire and Blood" },
  { id: 3, name: "House Baratheon", words: "Ours is the Fury" },
  { id: 4, name: "House Greyjoy", words: "We Do Not Sow" },
];

export default class Houses {
  constructor() {
    this.data = HOUSES;
  }

  getAllHouses() {
    return this.data;
  }

  getHouseById(id) {
    return this.data.find((house) => house.id === parseInt(id));
  }

  addHouse(house) {
    this.data.push(house);
    return this.data;
  }

  updateHouse(id, updates) {
    const house = this.data.find((house) => house.id === id);
    if (!house) throw new Error("House not found");
    Object.assign(house, updates);
    return this.data;
  }

  deleteHouse(id) {
    const index = this.data.findIndex((house) => house.id === id);
    if (index === -1) throw new Error("House not found");
    this.data.splice(index, 1);
    return this.data;
  }

  houseReducer(house) {
    return {
      id: house.id,
      name: house.name,
      words: house.words,
    };
  }
}
