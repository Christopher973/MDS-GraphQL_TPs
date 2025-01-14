import Characters from "./datasources/characters";

let characters = new Characters();

const resolvers = {
  Query: {
    characters: async (parent, args, context, info) => {
      return await characters.getAllCharacters();
    },
    character: async (parent, { id }) => {
      return await characters.getCharacterById(id);
    },
  },
};
export default resolvers;
