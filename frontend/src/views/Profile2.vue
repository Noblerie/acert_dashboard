<template>
   <div class="raw">
    <label for="item-name">Name: </label>
    <input :value="name" @input="updateName($event.target.value)" type="text" class="form-control" id="item-name">
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
type EmitOption = 'update:name';
type Props = { name: string };

export default {
  name: 'Item',
  props: ['name'],
  emits: ['update:name'],

  setup(props: Props, { emit }: SetupContext<EmitOption[]>) {
    const updateName = value => emit('update:name', value);

    return { updateName };
  }
};
</script>