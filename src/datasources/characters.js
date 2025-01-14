const gameOfThronesApi = require("./gameOfThronesApi");
export default class Characters {
  async getAllCharacters() {
    const characters = await gameOfThronesApi.get("/Characters");
    return Array.isArray(characters.data)
      ? characters.data.map((character) => this.characterReducer(character))
      : [];
  }

  async getCharacterById(id) {
    const characters = await gameOfThronesApi.get(`/Characters/${id}`);
    return this.characterReducer(characters.data);
  }

  characterReducer(character) {
    return {
      id: character.id || 0,
      firstName: character.firstName,
      lastName: character.lastName,
      fullName: character.fullName,
      title: character.title,
      family: character.family,
      image: character.image,
      imageUrl: character.imageUrl,
    };
  }
}
