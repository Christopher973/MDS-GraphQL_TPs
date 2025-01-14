import Characters from "./datasources/characters";
import Houses from "./datasources/houses";

let characters = new Characters();
let houses = new Houses();

const resolvers = {
  Query: {
    characters: () => characters.getAllCharacters(),
    character: (_, { id }) => characters.getCharacterById(id),
    houses: () => houses.getAllHouses(),
    house: (_, { id }) => houses.getHouseById(id),
  },
  Mutation: {
    createHouse: (_, { id, name, words }) => {
      return houses.addHouse({ id, name, words });
    },
    updateHouse: (_, { id, name, words }) => {
      return houses.updateHouse(id, { name, words });
    },
    deleteHouse: (_, { id }) => {
      return houses.deleteHouse(id);
    },
  },
};
export default resolvers;
