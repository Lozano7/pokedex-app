import 'animate.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { createStore } from 'vuex';
import App from './App.vue';
import './index.css';

const store = createStore({
  state() {
    return {
      searchNotFound: false,
      pokemons: [],
      isLoading: false,
      next: null,
      previous: null,
      isSearching: false,
      favorites: [],
      isFavorites: false,
      isModalOpen: false,
      isModalCommentsOpen: false,
      pokemonSelected: null,
      pokemonComments: [],
      pokemonsComments: [],
      pokemonCommentData: null,
      isLocalStorage: false,
    };
  },
  mutations: {
    setIsLocalStorage(state, value) {
      state.isLocalStorage = value;
    },
    toggleSearchNotFound(state, value) {
      state.searchNotFound = value;
    },
    setPokemons(state, value) {
      state.pokemons = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setNext(state, value) {
      state.next = value;
    },
    setPevious(state, value) {
      state.previous = value;
    },
    setIsSearching(state, value) {
      state.isSearching = value;
    },
    setFavorites(state, value) {
      state.favorites = value;
    },
    addFavorites(state, value) {
      state.favorites = [...state.favorites, value];
    },
    removeFavorites(state, value) {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.name !== value.name
      );
    },
    setIsFavorites(state, value) {
      state.isFavorites = value;
    },
    toggleModal(state, value) {
      state.isModalOpen = value;
    },
    toggleModalComments(state, value) {
      state.isModalCommentsOpen = value;
    },
    setPokemonSelected(state, value) {
      state.pokemonSelected = value;
    },
    setPokemonCommentData(state, value) {
      state.pokemonCommentData = value;
    },
    addComment(state, value) {
      console.log(state.pokemonsComments);
      state.pokemonsComments.push(value);
    },
    deleteComment(state, id) {
      if (state.isLocalStorage) {
        const newState = state.pokemonsComments.filter(
          (comment) => comment[0].id !== id
        );
        console.log(newState);
        state.pokemonsComments = newState;
      } else {
        const newState = state.pokemonsComments.filter(
          (comment) => comment.id !== id
        );
        console.log(newState);
        state.pokemonsComments = newState;
      }
    },
    addCommentForPokemon(state, value) {
      console.log(state.pokemonComments);
      state.pokemonComments.push(value);
    },
  },
});
const app = createApp(App);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');
