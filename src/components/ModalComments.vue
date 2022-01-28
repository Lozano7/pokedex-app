<template>
  <div
    class="fixed inset-0 bg-slate-800 bg-opacity-80 overflow-y-auto h-full w-full z-50 flex flex-grow justify-center items-center"
    @click="handleClickClose"
  >
    <div
      class="w-[300px] bg-white rounded-md p-4 flex justify-center md:w-[625px] md:rounded-lg md:px-10 md:py-8"
      @click.stop
    >
      <div :class="classComments">
        <h2 class="text-xl text-center mb-4 md:text-2xl capitalize">
          {{ this.$store.state.pokemonCommentData.name }} Comments
        </h2>
        <div
          v-if="this.$store.state.pokemonComments.length > 0"
          class="w-full h-96 max-h-96 overflow-y-auto"
        >
          <Coments
            v-for="comment in this.$store.state.pokemonComments"
            :key="setCommentID(comment)"
            :name="comment.name"
            :comment="comment.comment"
          />
        </div>
        <h3 class="text-center text-xl my-5" v-else>Not Comments</h3>
        <div class="flex justify-center mt-4 mb-0">
          <button :class="buttonAddClass" @click="handleAddComment">
            Add Comment
          </button>
        </div>
      </div>
      <div v-if="isForm">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col pl-6 h-full w-64"
        >
          <h3 class="text-center mb-2">Add Your Comment</h3>
          <div>
            <label for="name" class="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              class="w-full p-1 border-2 border-gray-300 rounded-lg text-xs my-2"
              v-model="comment.name"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label for="comment" class="text-sm text-gray-600 my-2"
              >Comment</label
            >
            <textarea
              name="comment"
              id="comment"
              class="h-[150px] w-full p-1 border-2 border-gray-300 rounded-lg text-xs my-2"
              v-model="comment.comment"
              placeholder="Your comment"
              required
            ></textarea>
          </div>
          <button class="bg-gray-800 text-white font-bold py-1 px-3 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Coments from './Coments.vue';
export default {
  name: 'ModalComents',
  data() {
    return {
      isForm: false,
      comment: {
        name: '',
        comment: '',
      },
      buttonAddClass: 'bg-gray-800 text-white font-bold py-1 px-3 rounded-lg',
      classComments: 'w-full md:block',
    };
  },
  methods: {
    handleAddComment() {
      this.classComments += ' hidden';
      this.buttonAddClass += ' hidden';
      this.isForm = true;
    },
    handleClickClose() {
      this.$store.commit('toggleModalComments', false);
      this.$store.commit('setPokemonCommentData', null);
    },
    handleSubmit() {
      this.$store.commit('addCommentForPokemon', this.comment);
      const isComments = this.$store.state.pokemonsComments.length;

      if (isComments) {
        let pokemonComments;
        if (this.$store.state.isLocalStorage) {
          const isPokemonCommentsExist =
            this.$store.state.pokemonsComments.find((comment) => {
              const commentConvert = Object.assign({}, comment);
              if (commentConvert[0]) {
                return (
                  commentConvert[0].id ===
                  this.$store.state.pokemonCommentData.id
                );
              } else {
                return (
                  commentConvert.id === this.$store.state.pokemonCommentData.id
                );
              }
            });
          console.log(isPokemonCommentsExist);
          if (isPokemonCommentsExist) {
            this.$store.commit(
              'deleteComment',
              this.$store.state.pokemonCommentData.id
            );
          }
        } else {
          const isPokemonCommentsExist =
            this.$store.state.pokemonsComments.find((comment) => {
              const commentConvert = Object.assign({}, comment);
              console.log(commentConvert.id);
              return (
                commentConvert.id === this.$store.state.pokemonCommentData.id
              );
            });
          console.log(isPokemonCommentsExist);
          if (isPokemonCommentsExist) {
            this.$store.commit(
              'deleteComment',
              this.$store.state.pokemonCommentData.id
            );
          }
        }
      }
      const comment = this.$store.state.pokemonComments.map((comment) => {
        return Object.assign({}, comment);
      });
      this.$store.commit('addComment', {
        id: parseInt(this.$store.state.pokemonCommentData.id),
        comments: comment,
      });
      console.log(this.$store.state.pokemonsComments);
      localStorage.setItem(
        'CommentsPokemons',
        JSON.stringify(this.$store.state.pokemonsComments)
      );
      this.buttonAddClass = this.buttonAddClass.replace('hidden', '');
      this.classComments = this.classComments.replace('hidden', '');
      this.isForm = false;
      this.comment = {
        name: '',
        comment: '',
      };
    },
    setCommentID(comment) {
      return `comment-${comment.name}-${new Date().getTime()}`;
    },
  },
  components: { Coments },
};
</script>
