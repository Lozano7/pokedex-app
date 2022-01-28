const getPokemon = async (url, notFound) => {
  try {
    const data = await fetch(url);
    const pokemon = await data.json();
    return [
      false,
      {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        weight: pokemon.weight,
        height: pokemon.height,
        types: pokemon.types.map(({ type }) => type.name),
      },
    ];
  } catch (error) {
    return [true, {}];
  }
};

export default getPokemon;
