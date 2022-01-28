<template>
  <div class="bg-gray-900 text-white font-bold py-1 px-3 rounded-lg flex m-1">
    <p class="text-center capitalize">{{ type }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
  computed: {
    typeClass() {
      return `bg-${this.type}-500`;
    },
  },
};
</script>
