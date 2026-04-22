<template>
  <div class="p-4 pt-20 flex flex-col h-[100dvh] overflow-hidden">
    <div class="flex-grow overflow-y-auto">
      <List />
    </div>
    <div class="pb-4 flex flex-col gap-3 shrink-0">
      <button @click="isDark = !isDark" :class="[
        'relative w-15 h-8 rounded-full transition-colors duration-300 focus:outline-none border border-gray-200 cursor-pointer',
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      ]">
        <div :class="[
          'absolute top-[3px] left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center text-lg transition-all duration-300',
          isDark ? 'translate-x-7 bg-white text-gray-800' : 'translate-x-0 bg-gray-300 text-white-800'
        ]">
          <component :is="isDark ? MoonIcon : SunIcon" class="w-6 h-6" />
        </div>
      </button>
      <Login />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import List from './List.vue'
import Login from './Login.vue'

const isDark = ref(false)

const updateHtmlClass = (val: boolean) => {
  const html = document.querySelector('html')
  if (html) {
    html.classList.toggle('dark', val)
  }
}

onMounted(() => updateHtmlClass(isDark.value))
watch(isDark, updateHtmlClass)
</script>
