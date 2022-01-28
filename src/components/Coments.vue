<template>
  <div class="w-full border-b-2 -5">
    <h3 class="text-sm break-words pt-2">{{ name }}</h3>
    <p class="text-xs p-2 break-words">
      {{ comment }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Coments',
  props: {
    name: '',
    comment: '',
  },
};
</script>
