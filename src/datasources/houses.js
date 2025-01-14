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
    const existingHouse = this.data.find((h) => h.id === parseInt(house.id));
    if (existingHouse) {
      throw new Error(`Une maison avec l'ID ${house.id} existe déjà`);
    }

    // Si l'ID n'existe pas, ajoute la nouvelle maison
    this.data.push({
      ...house,
      id: parseInt(house.id), // Assure que l'ID est un nombre
    });
    return this.data;
  }

  updateHouse(id, updates) {
    const houseId = parseInt(id);

    // Recherche de la maison
    const houseIndex = this.data.findIndex((house) => house.id === houseId);

    // Vérification si la maison existe
    if (houseIndex === -1) {
      throw new Error(`Maison avec l'ID ${id} non trouvée`);
    }

    // Mise à jour de la maison
    this.data[houseIndex] = {
      ...this.data[houseIndex],
      ...updates,
      id: houseId, // Préserve l'ID original
    };

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
