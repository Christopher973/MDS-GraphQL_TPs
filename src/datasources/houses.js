// Définition des données dans une constante pour l'immutabilité
const HOUSES = [
  { id: 1, name: "House Stark", words: "Winter is Coming" },
  { id: 2, name: "House Targaryen", words: "Fire and Blood" },
  { id: 3, name: "House Baratheon", words: "Ours is the Fury" },
  { id: 4, name: "House Greyjoy", words: "We Do Not Sow" },
];

export default class Houses {
  constructor() {
    this.houses = HOUSES;
  }

  getAllHouses() {
    return this.houses;
  }

  getHouseById(id) {
    return this.houses.find((house) => house.id === id);
  }

  houseReducer(house) {
    return {
      id: house.id,
      name: house.name,
      words: house.words,
    };
  }
}
