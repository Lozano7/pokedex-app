<template>
  <div class="w-full h-15 flex flex-row justify-between py-1 bg-[#f03]">
    <div class="flex items-center px-3">
      <h1 class="text-3xl text-white">Pokedex</h1>
      <img class="mx-2" src="../assets/pikachu.png" alt="logo" />
    </div>
    <div class="flex p-1">
      <button
        class="bg-transparent text-lg hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click="handleClickFavorites"
      >
        <i class="bx bxs-star text-[#FFA420]"></i>
        Favorites
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handleClickFavorites() {
      if (this.$store.state.favorites.length > 0) {
        if (this.$store.state.searchNotFound) {
          this.$store.commit('toggleSearchNotFound', false);
        }
        this.$store.commit('setIsFavorites', true);
        this.$store.commit('setIsSearching', true);
        this.$store.commit('setPokemons', this.$store.state.favorites);
      } else {
        this.showAlertError();
      }
    },
    showAlertError() {
      this.$swal({
        title: 'Error',
        text: 'You have not added any pokemon to favorites',
        type: 'error',
        confirmButtonText: 'Ok',
      });
    },
  },
};
</script>
