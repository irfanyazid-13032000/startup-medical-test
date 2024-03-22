
<script setup>
defineProps({
  movie:Object
})
</script>

<template>
  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h5 class="underline">
      {{ movie.name }}
    </h5>

  </div>
</template>



<style lang="scss" scoped>

</style>