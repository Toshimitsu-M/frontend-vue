<template>
  <div class="flex">
    <div>
      <Bars3Icon class="w-5 h-8 ml-1 text-gray-600 cursor-pointer" @click="emit('update:show', !show)" />
    </div>
    <img src="@/assets/penguin_logo_1.svg" class="w-10 h-auto" />

    <div class="flex-grow"></div>

  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show'])
</script>
<style>
.cursor-pointer {
  cursor: pointer !important;
}
</style>