const types = {
  fairy: 'bg-fairy',
  normal: 'bg-normal',
  fire: 'bg-fire',
  water: 'bg-water',
  grass: 'bg-grass',
  electric: 'bg-electric',
  ice: 'bg-ice',
  fighting: 'bg-fighting',
  poison: 'bg-poison',
  ground: 'bg-ground',
  flying: 'bg-flying',
  psychic: 'bg-psychic',
  bug: 'bg-bug',
  rock: 'bg-rock',
  ghost: 'bg-ghost',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  steel: 'bg-steel',
};
export default function setColorCard(type) {
  return types[type];
}
