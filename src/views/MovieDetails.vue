<script>
import { ref,onMounted } from "vue";
import {useRoute} from 'vue-router'

const queryMovie = ref({})
const route = useRoute();

onMounted(async () => {
  const result = await fetch(`http://localhost:3000/movies/${route.params.id}`)
  const response = result.json()
  queryMovie.value = response
})


</script>
<template>
  <h1>halo detailku {{ $route.params.id }}</h1>
</template>