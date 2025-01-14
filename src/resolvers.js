import Characters from "./datasources/characters";
import Houses from "./datasources/houses";

let characters = new Characters();
let houses = new Houses();

const resolvers = {
  Query: {
    characters: () => characters.getAllCharacters(),
    character: (_, { id }) => characters.getCharacterById(id),
    houses: () => houses.getAllHouses(),
  },
  Mutation: {
    createHouse: (parent, { id, name, words }) => {
      let newHouse = { id, name, words };
      houses.houses.push(newHouse); // Correction ici
      return houses.houses; // Et ici
    },
    updateHouse: (parent, { id, name, words }) => {
      let house = houses.houses.find((house) => house.id === id); // Correction ici
      house.name = name;
      house.words = words ? words : house.words;
      return houses.houses; // Et ici
    },
    deleteHouse: (parent, { id }) => {
      let houseIndex = houses.houses.findIndex((house) => house.id === id); // Correction ici
      if (houseIndex === -1) {
        throw new Error("House not found");
      } else {
        houses.houses.splice(houseIndex, 1);
      }
      return houses.houses; // Et ici
    },
  },
};
export default resolvers;
