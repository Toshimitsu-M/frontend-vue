<template>
  <div class="relative bg-gray-100 dark:bg-gray-800">
    <!-- ロゴ＋三本線ストリップ（常時最前面表示） -->
    <Header
      class="fixed top-0 left-0 z-50 p-1 bg-gray-100 dark:bg-gray-800"
      :show="show"
      @update:show="show = $event"
    />

    <!-- サイドバー（ヘッダーに重なるよう z-40） -->
    <div
      v-if="showButton"
      class="fixed left-0 top-0 w-40 h-[100dvh] bg-gray-100 dark:bg-gray-800 z-40 transform transition-transform duration-300"
      :class="{ '-translate-x-full': !show }"
    >
      <Sidebar />
    </div>

    <!-- メインコンテンツ -->
    <div
      class="min-h-screen bg-gray-100 dark:bg-gray-800 overflow-auto transition-all duration-300"
      :class="show ? 'pl-40' : 'pl-10'"
    >
      <slot />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
// @ts-ignore
import Sidebar from '../components/Sidebar.vue'
// @ts-ignore
import Header from '../components/Header.vue'

// @ts-ignore
const showButton = import.meta.env.VITE_SHOW_BUTTON === 'true';

// @ts-ignore
const show = ref(false)

// ダークモードの状態を管理
const isDark = ref(false)

const updateHtmlClass = (isDark: boolean) => {
  // @ts-ignore
  const html = document.querySelector('html')
  // @ts-ignore
  console.log('media ' ,window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (html) {
    html.classList.remove('dark')
    if (isDark) {
      html.classList.add('dark')
    }
    console.log('dark class applied:', isDark)
    console.log('html.className:', html.className)
  } else {
    console.warn('html element not found')
  }
}
onMounted(() => {
  nextTick(() => updateHtmlClass(isDark.value))
})
watch(isDark, (val) => {
  nextTick(() => updateHtmlClass(val))
})
</script>
