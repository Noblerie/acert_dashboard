<template>
  <h1>{{ data.id.value }}</h1>
</template>

<script>
  import { ref, reactive } from "vue";
  import { member_id } from "../views/Member.vue";

  export default {
    setup() {
      const data = reactive({
        id: 666,
      });

      return { data: member_id() };
    }
  };
</script>