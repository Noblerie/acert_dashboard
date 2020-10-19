<template>
  <div class="text-gray-700 border-gray-300 border-2 rounded-lg focus:outline-none">
    <div class="px-3 py-4">
    <h3 class="text-2xl font-bold mb-4">Team's name</h3>
    <h3 class="font-semibold text-base mb-4">This is the name of your team, every members can see that. {{ new_name.length}}</h3>
    <input v-if="issue" id="new_name" v-model="new_name" placeholder="Name" type="text" class="form-input  text-xl py-2 appearance-none rounded-md border-red-600 border-2 w-1/2"/>
    <input v-else type="text" placeholder="Name" id="new_name" v-model="new_name" class="form-input text-xl py-2 appearance-none rounded-md focus:border-indigo-600 w-1/2"/>
    </div>
  <div class="text-gray-700 border-gray-300 border-t-2 flex justify-between">
    <h3 class="font-medium px-3 py-4 mt-3">Please use 32 caracters at maximum.</h3>
    <input @click="onSubmit();" class="button rounded-lg bg-gray-900 text-white font-semibold px-6 py-4 mt-3 mb-2 mr-3 appearance-none hover:bg-gray-700" type="submit" value="Save">
  </div>
  </div>

  <div class="text-gray-700 border-gray-300 border-2 rounded-lg mt-3 focus:outline-none">
    <div class="px-3 py-4">
    <h3 class="text-2xl font-bold mb-4">Change Team's name</h3>
    <h3 class="font-semibold text-base mb-4">Modify the name of your team, every members can see that.</h3>
    <input v-if="issue2" id="up_name" v-model="up_name" placeholder="New name" type="text" class="form-input  text-xl py-2 appearance-none rounded-md border-red-600 border-2 w-1/2"/>
    <input v-else type="text" id="up_name" v-model="up_name" placeholder="New name" class="form-input text-xl py-2 appearance-none rounded-md focus:border-indigo-600 w-1/2"/>
    </div>
  <div class="text-gray-700 border-gray-300 border-t-2 flex justify-between">
    <h3 class="font-medium px-3 py-4 mt-3">Please use 32 caracters at maximum.</h3>
    <input @click="updateName();" class="button rounded-lg bg-gray-900 text-white font-semibold px-6 py-4 mt-3 mb-2 mr-3 appearance-none hover:bg-gray-700" type="submit" value="Save">
  </div>
  </div>

  <div class="text-gray-700 border-gray-300 border-2 rounded-lg mt-3 focus:outline-none">
    <div class="px-3 py-4">
    <h3 class="text-2xl font-bold mb-4">Delete this Team</h3>
    <h3 class="font-semibold text-base mb-4">Delete your team, will remove all contents.</h3>
    </div>
  <div class="text-gray-700 border-gray-300 border-t-2 flex justify-between focus:outline-none">
    <h3 class="font-medium px-3 py-4 mt-3">Remove.</h3>
    <input @click="ruSure = true" v-if="!ruSure" class="button rounded-lg bg-gray-900 text-white font-semibold px-6 py-4 mt-3 mb-2 mr-3 appearance-none hover:bg-gray-700" type="submit" value="Delete">
    <div v-if="ruSure">
      <h1 class="font-bold text-center mr-3">Are you sure ?</h1>
      <input @click="ruSure = false" class="button rounded-lg bg-gray-900 text-white font-semibold px-10 py-4 mt-3 mb-2 mr-3 appearance-none hover:bg-gray-700" type="submit" value="No">
      <input @click="rmTeam();" class="button rounded-lg bg-red-600 text-white font-semibold px-6 py-4 mt-3 mb-2 mr-3 appearance-none hover:bg-red-500" type="submit" value="Delete">
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      new_name: '',
      up_name: '',
      owner_id: 5535,
      id: 1,
      max: 32,
      param: 'name',
      issue: false,
      issue2: false,
      ruSure: false,
    }
  },
  methods: {
      onSubmit() {
        if (this.new_name === '' || this.owner_id === '') {
          this.issue = true
          return
        } else {
          axios.post('http://127.0.0.1:3001/team', {
              name: this.new_name,
              owner_id: this.id,
          }).then(reponse => console.log(reponse))
            .catch(error => this.issue = true)
        }
      },
      updateName() {
        if (this.up_name === '' || this.up_name === this.new_name) {
          this.issue2 = true
          return
        } else {
          axios.patch('http://127.0.0.1:3001/team/up/' + this.id, {
              update: this.up_name,
          }).then(reponse => console.log(reponse))
            .catch(error => this.issue2 = true)
        }
      },
      rmTeam() {
          this.ruSure = false
          axios.delete('http://127.0.0.1:3001/team/delete/' + this.id)
            .then(reponse => console.log(reponse))
            .catch(error => console.log(error))
      },
  }
}
</script>
