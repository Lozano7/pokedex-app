<template>
  <div
    class="grid grid-cols-1 gap-7 animate__animated animate__fadeIn md:grid-cols-4"
  >
    <CardPokemons
      v-for="pokemon in this.$store.state.pokemons"
      :key="setId(pokemon)"
      :pokemon="pokemon"
      :pokemonInfo="false"
    />
  </div>
</template>

<script>
import CardPokemons from './CardPokemons.vue';
export default {
  name: 'GridPokemons',
  props: {
    next: String,
    previous: String || null,
  },
  components: {
    CardPokemons,
  },
  methods: {
    setId(pokemon) {
      return `pokemon-${pokemon.id}-${pokemon.name}- ${Math.floor(
        Math.random() * 1000
      )}`;
    },
  },
};
</script>
