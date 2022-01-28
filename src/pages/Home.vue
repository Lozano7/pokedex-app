<template>
  <div
    class="w-screen min-h-screen max-w-full font-roboto flex flex-col flex-grow box-border bg-[#21232a]"
  >
    <Modal v-if="this.$store.state.isModalOpen" />
    <ModalComments v-if="this.$store.state.isModalCommentsOpen" />
    <Header />
    <Search />
    <Loading v-if="this.$store.state.isLoading === true" />
    <div v-else>
      <div v-if="this.$store.state.searchNotFound">
        <div class="w-full text-center">
          <h2 class="text-2xl text-white text-center capitalize">
            Search Not Found
          </h2>
        </div>
      </div>
      <div class="w-full px-8" v-else>
        <GridPokemons />
        <div
          class="w-full flex justify-center py-5"
          v-if="!this.$store.state.isFavorites"
        >
          <div v-if="this.$store.state.isSearching === false">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-8"
              v-if="this.$store.state.previous"
              @click="previousPage"
            >
              <i class="bx bx-left-arrow-alt"></i>
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="nextPage"
            >
              <i class="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridPokemons from '../components/GridPokemons.vue';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';
import ModalComments from '../components/ModalComments.vue';
import Modal from '../components/ModalPokemon.vue';
import Search from '../components/Search.vue';
import getPokemons from '../helpers/getPokemons';
export default {
  name: 'App',
  components: {
    Header,
    GridPokemons,
    Loading,
    Search,
    Modal,
    ModalComments,
  },
  methods: {
    nextPage() {
      getPokemons(this.$store.state.next).then(
        async ({ next, previous, pokemons }) => {
          const result = await Promise.all(pokemons);
          this.$store.commit('setPokemons', result);
          this.$store.commit('setNext', next);
          this.$store.commit('setPevious', previous);
        }
      );
    },
    previousPage() {
      getPokemons(this.$store.state.previous).then(
        async ({ next, previous, pokemons }) => {
          const result = await Promise.all(pokemons);
          this.$store.commit('setPokemons', result);
          this.$store.commit('setNext', next);
          this.$store.commit('setPevious', previous);
        }
      );
    },
  },
  mounted() {
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
    if (localStorage.getItem('favoritesPokemons')) {
      this.$store.commit(
        'setFavorites',
        JSON.parse(localStorage.getItem('favoritesPokemons'))
      );
    }
    if (localStorage.getItem('CommentsPokemons')) {
      const comments = JSON.parse(localStorage.getItem('CommentsPokemons'));
      this.$store.commit('addComment', comments);
      this.$store.commit('setIsLocalStorage', true);
      console.log(this.$store.state.pokemonsComments);
    }
  },
};
</script>
