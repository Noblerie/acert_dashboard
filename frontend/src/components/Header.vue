<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
    <div class="flex items-center">
      <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
          class="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>

    <div class="flex items-center">
      <button class="flex mx-4 text-gray-600 focus:outline-none">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        >
          <img
            class="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
          />
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div v-show="dropdownOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <router-link
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
          :class="[$route.name === 'Profile' ? activeClass : inactiveClass]"
          to="/profile"
          >
          <span>Profile</span>
          </router-link>
          <div>
            <button @click="getTeam()">omg</button>
            <h1 @click="teamTab = !teamTab" class="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white flex">
              Teams<svg v-if="teamTab" class="h-5 w-5 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
              <svg v-if="!teamTab" class="h-5 w-5 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </h1>
            <div v-if="teamTab" class="bg-gray-700 text-white">
              <h1 v-for="item in team_list" class="px-3 py-2 text-sm flex hover:bg-gray-500">{{ item.name }}</h1>
              <router-link class="block px-4 py-2 text-sm hover:bg-gray-500" :class="[$route.name === 'Teams' ? activeClass : inactiveClass]" to="/teams">
               <span class="flex justify-between font-semibold">Create a Team<svg class="h-5 w-5 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"/></svg></span>
               </router-link>
            </div>
          </div>
          <router-link
            to="/"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
          >Log out</router-link>
        </div>
      </div>
    </div>
    <h1 class="bg-white">{{ data.id.value }}</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useSidebar } from "../hooks/useSidebar";
import { member_id } from "../views/Member.vue";

export default defineComponent({
  data() {
    return{
      teamTab: false,
      team_list: []
    }
  },
  methods: {
    getTeam() {
      axios.get('http://127.0.0.1:3001/user/team/get/' + this.id)
            .then(reponse => this.team_list = reponse.data.teams)
            .catch(error => console.log(error))
    }
  },
  setup(_, { emit }) {
    const dropdownOpen = ref(false);
    const { isOpen } = useSidebar();
    const data = reactive({
        id: 666,
      });
    data: member_id();

    return {
      data: member_id(),
      isOpen,
      dropdownOpen,
    };
  },
});
</script>
