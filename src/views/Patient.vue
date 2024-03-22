<script setup>
import { ref, onMounted } from 'vue'

const patients = ref([])

onMounted(() => {
  fetch('http://localhost:3000/patients')
  .then((response)=>response.json())
  .then(patientsApi => {
    patients.value = patientsApi
  })
})


</script>


<template>
    <h1 class="text-xl text-center">patient</h1>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-center  text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">No</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Address</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" v-for="patient in patients" :key="patient.id" :patient="patient"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ patient.id }}
          </th>
          <td class="px-6 py-4"> {{ patient.name }}</td>
          <td class="px-6 py-4"> {{ patient.address }}</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5"
              >detail</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>



</template>

<script setup></script>
