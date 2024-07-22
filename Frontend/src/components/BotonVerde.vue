<template>
    <button class="text-4xl lg:text-xl p-4 rounded-2xl border-white border-[2px] border-solid bg-[#134030] text-white">{{ text }}</button>
</template>

<script setup>
  const props = defineProps({
    text: String
  });
</script>