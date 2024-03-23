<script setup>
import { ref, onMounted,watch } from 'vue'
import axios from 'axios';

const patients = ref([])
const hiddenModal = ref(true)
const modalStatus = ref("")

const name = ref("")
const sex = ref("")
const religion = ref("")
const phone = ref("")
const address = ref("")
const selectedPatient = ref({})

const fetchData = () => {
  fetch('http://localhost:3000/patients')
  .then((response)=>response.json())
  .then(patientsApi => {
    patients.value = patientsApi
  })
}

onMounted(() => {
  fetchData()
})

watch(patients, () => {
  fetchData()
})




function toggleModal() {
  hiddenModal.value = !hiddenModal.value
}

function insertModalShow() {
  modalStatus.value = "create"
  selectedPatient.value = {}
  name.value = ""
  sex.value = ""
  religion.value = ""
  phone.value = ""
  address.value = ""
   hiddenModal.value = false
}

function editModalShow(patient) {
  modalStatus.value = "edit"
  selectedPatient.value = patient
  name.value = patient.name
  sex.value = patient.sex
  religion.value = patient.religion
  phone.value = patient.phone
  address.value = patient.address
  hiddenModal.value = false
}

function detailModalShow(patient) {
  modalStatus.value = "detail"
   name.value = patient.name
  sex.value = patient.sex
  religion.value = patient.religion
  phone.value = patient.phone
  address.value = patient.address
  hiddenModal.value = false
}

function editPatient() {
  axios.put(`http://localhost:3000/patients/${selectedPatient.value.id}`, {
    name: name.value,
    sex: sex.value,
    religion: religion.value,
    phone: phone.value,
    address:address.value
  })
   hiddenModal.value = true
}

function insertPatient() {
  toggleModal()
  axios.post('http://localhost:3000/patients', {
    name: name.value,
    sex: sex.value,
    religion: religion.value,
    phone: phone.value,
    address:address.value
  })
}

function deletePatient(param) {
 axios.delete(`http://localhost:3000/patients/${param}`)
}

</script>


<template>
  <div class="flex justify-center items-center">
    <button class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 mt-2 h-12">Patient</button>
  </div>
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
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="editModalShow(patient)"
              >Edit</a
            >
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5" @click="detailModalShow(patient)"
              >detail</a
            >
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5" @click="deletePatient(patient.id)"
              >delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>



<!-- Modal toggle -->
<button data-modal-target="default-modal" data-modal-toggle="default-modal" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3" type="button" @click="insertModalShow">
  Insert Patient
</button>

<!-- Main modal -->
<div id="default-modal" :class="{ 'hidden': hiddenModal }" class="mb-5">
    <div class="relative mt-5">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Form {{ modalStatus }} Patient
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" @click="toggleModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
          
            <form class="p-3">
                <div class="columns-3">
                <div class="mb-5">
                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" v-model="name" value="name"/>
                </div>
                <div class="mb-5">
                    <select id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="sex">
                        <option value="">choose sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

              

                <div class="mb-5">
                     <select id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="religion">
                        <option value="">choose religion</option>
                        <option value="islam">Islam</option>
                        <option value="kristen">Kristen</option>
                        <option value="katolik">Katolik</option>
                        <option value="hindu">Hindu</option>
                        <option value="budha">Budha</option>
                    </select>
                </div>
                <div class="mb-5">
                    <input type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" v-model="phone"/>
                </div>
                <div class="mb-5">
                    <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address" v-model="address"/>
                </div>
                </div>
            </form>


            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button  v-if="modalStatus == 'create'" data-modal-hide="default-modal" type="button" class="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="insertPatient">Insert</button>
              <button  v-if="modalStatus == 'edit'" data-modal-hide="default-modal" type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-purple-400 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="editPatient">Edit</button>
            </div>
        </div>
    </div>
</div>


</template>

