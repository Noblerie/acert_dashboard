<template>
  <h6 class="bg-green-500">{{ firstName }}</h6>
</template>

<script lang="ts">
  import { onMounted, onUpdated, onUnmounted, watch } from 'vue';
  import Item from './Profile2.vue';
  import { useCart } from '../hooks/test';

  export default {
  name: 'Cart',
  components: Item,

  setup() {
    console.log('setup');
    const { firstName } = useCart();

    watch([firstName], () => console.log(`watch: ${firstName.value}`));

    onMounted(() => {
      console.log('mounted');
    });
    onUpdated(() => console.log('updated'));
    onUnmounted(() => console.log('onunmounted'));

    return { firstName };
  }
};
</script>