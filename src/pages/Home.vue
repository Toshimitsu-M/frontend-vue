<template>
  <main>
    <!-- ファーストビュー -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-100 to-blue-300 px-4 dark:from-gray-500 dark:via-gray-700 dark:to-gray-800 transition-colors">
      <div class="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <div class="text-left">
          <h1 class="text-6xl font-bold text-gray-800 dark:text-white">Antarctic-Vue</h1>
          <br />
        </div>
        <img src="@/assets/penguin_logo_1.svg" alt="Antarctic-Vue Logo" class="w-28 h-28" />
      </div>
    </section>

    <!-- バブルアニメーション -->
    <section
      class="relative overflow-hidden flex items-center justify-center min-h-screen transition-colors duration-[4000ms]"
      :class="bgClass"
    >
      <div v-for="n in 5" :key="n" class="bubble" :style="randomBubbleStyle(n)" />
      <transition name="fade">
        <div v-if="showContent" class="flex sm:flex-col md:flex-row items-center justify-center z-10">
          <div>
            <img src="@/assets/penguin_logo_1.svg" alt="Antarctic-Vue Logo" class="w-24 h-24" />
          </div>
          <div class="text-left">
            <h1 class="text-6xl font-bold text-black drop-shadow-lg">Antarctic-Vue</h1>
            <p class="text-2xl text-black/90">南の果てで、コードを書く。</p>
          </div>
        </div>
      </transition>
    </section>

    <!-- このサイトについて -->
    <section id="about" class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">このサイトについて</h2>
      <p>ここはエンジニアToshimitsu-Mのポートフォリオサイトです。
        これまでに手がけた制作物、身につけたスキルをまとめています。
        あなたに、私のことをもっと深く知ってほしいと思って作りました。
        どうぞお茶でも飲みながらごゆるりとサイト内を散策してください。</p>
    </section>

    <!-- 私について -->
    <section id="howto" class="min-h-screen p-8 bg-white">
      <h2 class="text-2xl font-bold mb-4">私について</h2>
      <p>宮城県出身のエンジニア。大学で経済学を学んだのち、塾講師に従事。その後ITの技術にひかれ、27才でIT業界へ転職。主にバックエンドの業務を経験してきました。</p>
    </section>

    <!-- 制作物 -->
    <section id="works" class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">制作物</h2>
    </section>

    <!-- スキルセット -->
    <section id="skills" class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">スキルセット</h2>
    </section>

    <!-- プロファイル -->
    <section id="profile" class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">プロファイル</h2>
    </section>

    <!-- Thank you -->
    <section id="thankyou" class="min-h-screen p-8 bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">Thank you for coming!</h2>
    </section>

    <!-- フッター -->
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>© 2025 Antarctic-Vue. All rights reserved.</p>
    </footer>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      showContent: false,
      bgClass: 'bg-gray',
      bubbles: []
    };
  },
  mounted() {
    this.showContent = true;
    this.createRandomBubbles();
    setInterval(this.updateBubbles, 2000);
  },
  methods: {
    createRandomBubbles() {
      for (let i = 0; i < 5; i++) {
        this.bubbles.push(this.randomBubbleStyle(i));
      }
    },
    updateBubbles() {
      this.bubbles = this.bubbles.map((bubble, index) => this.randomBubbleStyle(index));
    },
    randomBubbleStyle(n) {
      const size = Math.random() * 320 + 160;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 7 + 3;
      const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 205, 86, 0.8)'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        backgroundColor: randomColor,
        borderRadius: '50%',
        boxShadow: `0 0 12px ${randomColor}`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationName: `bloom${n}`,
        filter: 'blur(0px)'
      };
    }
  }
};
</script>

<style scoped>
.bubble {
  position: absolute;
  animation: bloom 10s infinite ease-in-out;
  pointer-events: none;
}

@keyframes bloom {
  0% { transform: scale(0.8) translateY(0); opacity: 1; }
  25% { opacity: 1; transform: scale(1.3) translateY(-10%); }
  50% { transform: scale(2) translateY(-50%); opacity: 1; }
  75% { opacity: 1; transform: scale(2.5) translateY(-70%); }
  100% { transform: scale(3) translateY(-100%); opacity: 1; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 1.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>