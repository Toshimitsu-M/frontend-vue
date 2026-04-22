<template>
  <div class="flex flex-col items-center w-10">
    <img src="@/assets/penguin_logo_1.svg" class="w-10 h-auto" />
    <Bars3Icon
      class="w-5 h-5 mt-1 text-gray-600 dark:text-white/50 cursor-pointer"
      @click="emit('update:show', !show)"
    />
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