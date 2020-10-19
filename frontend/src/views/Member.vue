<template>
  <div class="flex justify-center items-center h-screen bg-gray-200 px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <img class="h-full w-full object-cover" src="../../assets/JetLogoDashboard500-160.png">
      </div>

      <div class="text-gray-700 text-3xl mt-3 font-medium text-center">
        <h3>Welcome Back </h3>
        <input
            type="email"
            placeholder="Temporaire"
            class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            v-model="email"
          />
      </div>

      <form v-if="!issue" class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-gray-700 text-sm">Username</span>
          <input
            type="name"
            class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            v-model="name"
          />
        </label>

        <label class="block mt-3">
          <span class="text-gray-700 text-sm">Phone number</span>
          <input
            type="phone_number"
            class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            v-model="phone_number"
          />
        </label>

        <div class="mt-6">
          <button
            type="submit"
            @click="postMember();"
            class="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500"
          >Continue</button>
        </div>
      </form>

      <form v-else class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-gray-700 text-sm">Username</span>
          <input
            type="name"
            class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            v-model="name"
          />
        </label>

        <label class="block mt-3">
          <span class="text-gray-700 text-sm">Phone number</span>
          <input
            type="phone_number"
            class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            v-model="id"
          />
        </label>

        <div class="mt-6">
          <button
            @click="postMember();"
            class="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500"
          >Continue</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  data() {
    return{
      email: "",
      name: "",
      phone_number: "",
      issue: false,
      id: 0,
      new_id: 0,
    }
  },
  methods: {
    postMember() {
      if (this.email === '' || this.name === '' || this.phone_number === '') {
          this.issue = true
          return
      } else {
      axios.post('http://127.0.0.1:3001/new/member', {
        email: this.email,
        name: this.name,
        phone_number: this.phone_number,
      })
        .then(reponse => this.id = reponse.data.id)
        .catch(error => console.log(error))
        return (this.id)
      }
    }
  },
  setup(id) {
    const router = useRouter();
    const new_id = id;
    const email = ref("");
    const name = ref("");
    const phone_number = ref("");

    function login() {
      router.push("/dashboard");
    };

    member_id(new_id);

    return {
      login,
      email,
      name,
      phone_number,
      new_id,
    }
  },
});

export function member_id(new_id) {
  const data = reactive({
    id: new_id,
  });
  console.log(new_id);
  return toRefs(data);
}
</script>
