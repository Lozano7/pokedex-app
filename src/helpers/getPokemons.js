const getPokemons = async (url) => {
  try {
    const data = await fetch(url);
    const { next, previous, results } = await data.json();
    const pokemons = results.map(async ({ url }) => {
      const data = await fetch(url);
      const pokemon = await data.json();
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        weight: pokemon.weight,
        height: pokemon.height,
        types: pokemon.types.map(({ type }) => type.name),
      };
    });
    return { next, previous, pokemons };
  } catch (error) {
    console.log(error);
  }
};

export default getPokemons;
