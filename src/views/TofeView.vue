<template>
  <div class="w-full h-[calc(100%_-_144px)]">
    <h2>2048</h2>
    <div class="flex justify-end items-center h-10">
      <div>Score: {{ game.score }}</div>
      <div>Best: {{ best }}</div>
    </div>
    <div class="m-auto w-full">
      <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="flex">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="w-[100px] h-[100px] flex items-center justify-center border"
          :style="cellStyle(cell)"
        >
          {{ cell || '' }}
        </div>
      </div>
    </div>
    <button @click="restart">Restart</button>
  </div>
</template>
<script setup lang="ts">
import { Tofe, Direction } from '@/lib/tofe'
import { onMounted, onUnmounted, reactive, ref, toRef } from 'vue'
const colorMap = new Map([
  [0, ['#cdc1b4', '#776e65']],
  [1, ['#eee4da', '#776e65']],
  [2, ['#ede0c8', '#776e65']],
  [3, ['#f2b179', '#f9f6f2']],
  [4, ['#f59563', '#f9f6f2']]
])
let game = new Tofe()
const matrix = ref(game.matrix)
const best = ref(10000)
const cellStyle = (cell: number) => {
  const index = cell === 0 ? 0 : Math.log2(cell) % 5
  const [bg, color] = colorMap.get(index)!
  return {
    backgroundColor: bg,
    color
  }
}

const restart = () => {
  game = new Tofe()
  matrix.value = JSON.parse(JSON.stringify(game.matrix))
}

const keydownHandler = (e: KeyboardEvent) => {
  const direction = e.key.replace('Arrow', '').toLowerCase() as Direction
  game.move(direction)
  matrix.value = JSON.parse(JSON.stringify(game.matrix))
}

onMounted(() => {
  window.addEventListener('keydown', keydownHandler)
})
onUnmounted(() => {
  window.removeEventListener('keydown', keydownHandler)
})
</script>
