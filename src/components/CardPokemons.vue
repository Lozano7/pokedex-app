<template>
  <div :class="classCard">
    <div class="p-3 flex justify-start w-full">
      <button @click="handleClickFavorites">
        <i :class="classButtonFavorites"></i>
      </button>
    </div>
    <div @click="handleClickCard" class="hover:cursor-pointer">
      <img
        :src="pokemon.image"
        class="w-[125px] h-[125px] m-auto my-3"
        alt="pokemon-image"
      />

      <div class="w-full text-center">
        <h3 class="text-xl text-center capitalize p-2">{{ pokemon.name }}</h3>
        <div v-if="pokemonInfo">
          <p class="text-base p-3">
            <strong>ID:</strong>
            {{ pokemon.id }}
          </p>
          <p class="text-base p-3">
            <strong>Height:</strong>
            {{ convertDecimeterToMeter(pokemon.height) }} m
          </p>
          <p class="text-base p-3">
            <strong>Weight:</strong>
            {{ convertHectogramToKilogram(pokemon.weight) }} Kg
          </p>
          <p class="text-base p-3">
            <strong>Types:</strong>
          </p>
        </div>
      </div>
      <div v-if="pokemonInfo">
        <div class="flex flex-wrap justify-center mb-2">
          <TypeCard
            v-for="type in pokemon.types"
            :type="type"
            :key="typesKey(type)"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-center py-2 mb-1"
      v-if="pokemonInfo === false"
    >
      <button
        @click.stop="viewComments"
        class="bg-gray-800 text-sm text-white font-bold py-1 px-3 rounded-lg"
      >
        Comments
      </button>
    </div>
  </div>
</template>

<script>
import setColorCard from '../helpers/setColorCard';
import TypeCard from './TypeCard.vue';
export default {
  name: 'CardPokemons',
  data() {
    return {
      classButtonFavorites: 'bx bxs-star text-2xl text-white',
      classCard: `rounded-lg shadow-[2] border-2 border-gray-300 hover:border-gray-400 ${setColorCard(
        this.pokemon.types[0]
      )}`,
    };
  },
  props: {
    pokemon: Object,
    pokemonInfo: Boolean,
  },
  methods: {
    typesKey(type) {
      return `${new Date().getTime()} - ${type}`;
    },
    handleClickFavorites() {
      if (this.classButtonFavorites.includes('text-[#FFA420]')) {
        this.classButtonFavorites = 'bx bxs-star text-2xl text-white';
        this.$store.commit('removeFavorites', this.pokemon);
        if (this.$store.state.isFavorites) {
          this.$store.commit('setPokemons', this.$store.state.favorites);
        }
      } else {
        this.classButtonFavorites += ' text-[#FFA420]';
        this.$store.commit('addFavorites', this.pokemon);
        localStorage.setItem(
          'favoritesPokemons',
          JSON.stringify(this.$store.state.favorites)
        );
      }
      if (this.$store.state.favorites.length > 0) {
        localStorage.setItem(
          'favoritesPokemons',
          JSON.stringify(this.$store.state.favorites)
        );
      } else {
        localStorage.removeItem('favoritesPokemons');
      }
    },
    handleClickCard() {
      this.$store.commit('toggleModal', true);
      this.$store.commit('setPokemonSelected', this.pokemon);
    },
    convertHectogramToKilogram(weight) {
      const parseWeight = parseInt(weight);
      return parseWeight / 10;
    },
    convertDecimeterToMeter(height) {
      const parseHeight = parseInt(height);
      return parseHeight / 10;
    },
    viewComments() {
      console.log(this.$store.state.pokemonsComments);
      let arr = this.$store.state.pokemonsComments;
      const isComments = this.$store.state.pokemonsComments.length;
      console.log(isComments);
      if (isComments > 0) {
        let pokemonComments;
        console.log(this.$store.state.isLocalStorage);
        if (this.$store.state.isLocalStorage) {
          pokemonComments = arr.find((comment) => {
            console.log(comment);
            const commentConvert = Object.assign({}, comment);
            console.log(commentConvert);
            if (commentConvert[0]) {
              return commentConvert[0].id === this.pokemon.id;
            } else {
              return commentConvert.id === this.pokemon.id;
            }
          });
          if (pokemonComments) {
            let pokemonsComments;
            if (pokemonComments[0]) {
              pokemonsComments = pokemonComments[0].comments.map((comment) => {
                const commentConvert = Object.assign({}, comment);
                console.log(commentConvert);
                return commentConvert;
              });
            } else {
              pokemonsComments = pokemonComments.comments.map((comment) => {
                const commentConvert = Object.assign({}, comment);
                console.log(commentConvert);
                return commentConvert;
              });
            }

            console.log(pokemonsComments);
            this.$store.state.pokemonComments = pokemonsComments;
          } else {
            this.$store.state.pokemonComments = [];
          }
        } else {
          pokemonComments = arr.find((comment) => {
            const commentConvert = Object.assign({}, comment);
            console.log(commentConvert);
            return commentConvert.id === this.pokemon.id;
          });
          if (pokemonComments) {
            const pokemonsComments = pokemonComments.comments.map((comment) => {
              const commentConvert = Object.assign({}, comment);
              console.log(commentConvert);
              return commentConvert;
            });
            console.log(pokemonsComments);
            this.$store.state.pokemonComments = pokemonsComments;
          } else {
            this.$store.state.pokemonComments = [];
          }
        }
      } else {
        this.$store.state.pokemonComments = [];
      }
      this.$store.commit('toggleModalComments', true);
      this.$store.commit('setPokemonCommentData', {
        id: this.pokemon.id,
        name: this.pokemon.name,
      });
    },
  },
  components: {
    TypeCard,
  },
  mounted() {
    if (this.$store.state.favorites.length > 0) {
      const isFavorite = this.$store.state.favorites.find(
        (pokemon) => pokemon.id === this.pokemon.id
      );
      if (isFavorite) {
        this.classButtonFavorites += ' text-[#FFA420]';
      }
    }
  },
};
</script>
