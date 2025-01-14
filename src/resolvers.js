import Characters from "./datasources/characters";
import Houses from "./datasources/houses";
import Continents from "./datasources/continents";

let characters = new Characters();
let houses = new Houses();
let continents = new Continents();

const resolvers = {
  Query: {
    characters: () => characters.getAllCharacters(),
    character: (_, { id }) => characters.getCharacterById(id),

    houses: () => houses.getAllHouses(),
    house: (_, { id }) => houses.getHouseById(id),

    continents: () => continents.getAllContinents(),
    continent: (_, { id }) => continents.getContinentById(id),
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
