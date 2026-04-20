<template>
  <div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
      検索ヒント：
      <span class="font-mono bg-gray-100 dark:bg-gray-700 rounded px-1">2024年春</span>、
      <span class="font-mono bg-gray-100 dark:bg-gray-700 rounded px-1">3年前の夏</span>、
      <span class="font-mono bg-gray-100 dark:bg-gray-700 rounded px-1">来年冬</span>
      のように入力してください
    </p>
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
import { ref, watchEffect } from 'vue'
import Card from './AnnictCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { parseDate } from './ParseDate'
import { useAnimeStore } from '../../store/animeStore'
import { storeToRefs } from 'pinia'

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
const { searchKey } = storeToRefs(store)

const getSeason = () => {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const seasonMap = [
    'winter', 'winter', 'winter',
    'spring', 'spring', 'spring',
    'summer', 'summer', 'summer',
    'fall', 'fall', 'fall'
  ]
  return `${year}-${seasonMap[month - 1]}`
}

const season = ref<string>(getSeason())
const first = ref<number>(10)

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

const {
  result: annictCards,
  loading,
  refetch
} = useQuery<Query>(GET_WORKS, {
  variables: {
    seasons: [season.value],
    first: first.value
  },
  fetchPolicy: 'cache-first'
})

const loadMore = () => {
  first.value += 10
  refetch({ seasons: [season.value], first: first.value })
}

watchEffect(() => {
  if (searchKey.value) {
    season.value = parseDate(String(searchKey.value))
  }
  refetch({ seasons: [season.value], first: first.value })

  if (annictCards.value?.searchWorks.edges) {
    store.setAnimeList(
      annictCards.value.searchWorks.edges.map((edge) => ({
        title: edge.node.title,
        watchersCount: edge.node.watchersCount,
        seasonYear: edge.node.seasonYear,
        image: { facebookOgImageUrl: edge.node.image.facebookOgImageUrl || '' }
      }))
    )
  }
})
</script>
