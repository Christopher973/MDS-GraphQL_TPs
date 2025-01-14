import Characters from "./datasources/characters";
import Houses from "./datasources/houses";

let characters = new Characters();
let houses = new Houses();

const resolvers = {
  Query: {
    characters: async (parent, args, context, info) => {
      return await characters.getAllCharacters();
    },
    character: async (parent, { id }) => {
      return await characters.getCharacterById(id);
    },

    houses: async (parent, args, context, info) => {
      return await houses.getAllHouses();
    },
  },
};
export default resolvers;
