<template>
  <div
    class="fixed inset-0 bg-slate-800 bg-opacity-90 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
    @click="handleClickClose"
  >
    <div class="w-64" @click.stop>
      <CardPokemons
        :pokemon="this.$store.state.pokemonSelected"
        :pokemonInfo="true"
      />
    </div>
  </div>
</template>

<script>
import CardPokemons from './CardPokemons.vue';
export default {
  name: 'Modal',
  components: { CardPokemons },
  methods: {
    handleClickClose() {
      this.$store.commit('toggleModal', false);
      this.$store.commit('setPokemonSelected', null);
    },
  },
};
</script>
