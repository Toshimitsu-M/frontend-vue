<template>
  <ul class="">
    <li class="mb-1 hover:bg-gray-100/10 dark:hover:bg-orange-100/10" v-for="list in visibleLists" :key="list.name">
      <router-link :to="list.link" class="
                flex
                items-center
                block
                p-2
                rounded-sm">
        <span class="text-orange-600 dark:text-white/50 ">{{ list.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

type Environment = 'development' | 'production';

interface SidebarItem {
  name: string;
  icon: string;
  link: string;
  /** 表示する環境。省略時はすべての環境で表示 */
  environments?: Environment[];
}

const currentEnv = import.meta.env.MODE as Environment;

const lists = reactive<SidebarItem[]>([
  {
    name: 'ホーム',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/',
  },
  {
    name: 'アニメホーム',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/animeHome',
  },
  {
    name: 'ポケポケカード',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/pokepokeCard',
  },
  {
    name: 'MarkItDown',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/markItDown',
  },
  {
    name: 'コルクボード',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/corkBoard',
  },
  {
    name: 'AIチャット',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/characterChat',
  },
  {
    name: '損益計算書',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/plStatement',
  },
]);

const visibleLists = computed(() =>
  lists.filter(item => !item.environments || item.environments.includes(currentEnv))
);
</script>
