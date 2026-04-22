<template>
  <div class="text-black dark:text-white">
    <div v-if="!auth.isLoggedIn()" class="text-gray-500 text-center py-8">
      お気に入りを表示するにはログインしてください。
    </div>

    <div v-else-if="loading" class="text-gray-400 text-center py-8">読み込み中...</div>

    <div v-else-if="favorites.length === 0" class="text-gray-500 text-center py-8">
      お気に入りキャラクターはまだいません。
    </div>

    <ul v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <li
        v-for="fav in favorites"
        :key="fav.characterId"
        class="flex flex-col items-center gap-2 p-3 rounded-lg border dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
        @click="goToCharacter(fav)"
      >
        <img :src="fav.characterImage" class="w-24 h-24 object-cover rounded-lg shadow" />
        <span class="text-sm text-center font-medium">{{ fav.characterName }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchFavorites, type Favorite } from '../../api/favorite'
import { useAuthStore } from '../../store/auth'
import { useCharacterStore } from '../../store/characterStore'

const auth = useAuthStore()
const characterStore = useCharacterStore()
const router = useRouter()

const favorites = ref<Favorite[]>([])
const loading = ref(false)

onMounted(async () => {
  if (!auth.isLoggedIn()) return
  loading.value = true
  favorites.value = await fetchFavorites()
  loading.value = false
})

const goToCharacter = (fav: Favorite) => {
  characterStore.setSelectedCharacter({
    id: fav.characterId,
    name: fav.characterName,
    image: fav.characterImage,
    voiceActors: '',
    voiceActorsImage: '',
  })
  router.push('/popularAnime/characterDetail')
}
</script>
