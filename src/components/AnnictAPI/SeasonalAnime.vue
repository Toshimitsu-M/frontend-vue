<template>
  <div>
    <div class="flex gap-3 justify-center mb-6">
      <select
        v-model="selectedYear"
        class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
      </select>
      <select
        v-model="selectedSeason"
        class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option v-for="s in seasonOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
    </div>
    <div id="app" class="p-6 flex flex-col items-center">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div
        v-else-if="annictCards?.searchWorks.edges.length"
        class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center w-full max-w-screen-lg mx-auto"
      >
        <Card
          v-for="(anime, index) in annictCards?.searchWorks.edges"
          :key="index"
          :title="anime.node.title"
          :image="anime.node.image.facebookOgImageUrl || 'no_image_yoko.jpg'"
          :number="index"
        />
      </div>
      <div v-else class="text-center text-gray-500">データがありません</div>
      <button
        v-if="annictCards?.searchWorks.edges.length"
        @click="loadMore"
        class="mt-6 px-6 py-2 bg-gray-700 hover:bg-orange-600 text-white rounded-full transition-colors"
      >
        もっと表示
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from './AnnictCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useAnimeStore } from '../../store/animeStore'

type Query =
  | {
      searchWorks: {
        edges: {
          node: {
            title: string
            watchersCount: number
            seasonYear: string
            image: { facebookOgImageUrl: string }
          }
        }[]
      }
    }
  | undefined

const store = useAnimeStore()

const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1
  const seasonMap = ['winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall']
  return seasonMap[month - 1]
}

const currentYear = new Date().getFullYear()
const selectedYear = ref<number>(currentYear)
const selectedSeason = ref<string>(getCurrentSeason())
const first = ref<number>(10)

const years = computed(() => {
  const result: number[] = []
  for (let y = currentYear + 1; y >= 2000; y--) {
    result.push(y)
  }
  return result
})

const seasonOptions = [
  { value: 'spring', label: '春' },
  { value: 'summer', label: '夏' },
  { value: 'fall', label: '秋' },
  { value: 'winter', label: '冬' },
]

const GET_WORKS = gql`
  query GetWorks($seasons: [String!], $first: Int!) {
    searchWorks(
      seasons: $seasons
      orderBy: { field: WATCHERS_COUNT, direction: DESC }
      first: $first
    ) {
      edges {
        node {
          title
          watchersCount
          seasonYear
          image {
            facebookOgImageUrl
          }
        }
      }
    }
  }
`

const variables = computed(() => ({
  seasons: [`${selectedYear.value}-${selectedSeason.value}`],
  first: first.value
}))

const {
  result: annictCards,
  loading,
} = useQuery<Query>(GET_WORKS, variables, { fetchPolicy: 'cache-first' })

const loadMore = () => {
  first.value += 10
}
</script>
