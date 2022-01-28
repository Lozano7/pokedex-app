<template>
  <div class="flex justify-center py-7">
    <form @submit.prevent="filterPokemon">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
        type="search"
        v-model="search"
        placeholder="Search by name or id ..."
      />
    </form>
    <button
      v-if="this.$store.state.isSearching"
      class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="setDefaultPokemons"
    >
      <i class="bx bx-arrow-back"></i>
    </button>
  </div>
</template>

<script>
import getPokemon from '../helpers/getPokemon';
import getPokemons from '../helpers/getPokemons';

export default {
  name: 'Search',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    async filterPokemon() {
      this.$store.commit('setIsLoading', true);
      try {
        const data = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${this.search.toLowerCase()}`,
          this.searchNotFound
        );
        this.$store.commit('setIsLoading', false);
        this.$store.commit('setIsSearching', true);
        if (data[0] == true) {
          this.$store.commit('toggleSearchNotFound', data[0]);
        } else {
          this.$store.commit('toggleSearchNotFound', data[0]);
          this.$store.commit('setPokemons', [data[1]]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setDefaultPokemons() {
      this.$store.commit('setIsLoading', true);
      getPokemons('https://pokeapi.co/api/v2/pokemon/').then(
        async ({ next, previous, pokemons }) => {
          const result = await Promise.all(pokemons);
          this.$store.commit('setIsLoading', false);
          this.$store.commit('setPokemons', result);
          this.$store.commit('setNext', next);
          this.$store.commit('setPevious', previous);
        }
      );
      this.$store.commit('setIsFavorites', false);
      this.$store.commit('setIsSearching', false);
      this.$store.commit('toggleSearchNotFound', false);
    },
  },
};
</script>
