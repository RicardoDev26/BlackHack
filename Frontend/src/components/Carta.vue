<template>
    <div class="w-[50px] h-[75px] lg:w-[100px] lg:h-[150px] border-red border-[3px] border-solid flex justify-center items-center bg-[#276940]">
        <div class="border-red border-[1px] border-solid w-[40px] h-[65px] lg:w-[80px] lg:h-[130px] flex items-center justify-center bg-[#E1B933]">
            <div class="hidden lg:block text-[10px] self-start left-10 mt-1 relative"> {{ figura }} </div>
            <div class="font-black text-3xl">{{ valor }}</div>
            <div class="hidden lg:block text-[10px] self-end right-10 rotate-180 relative">{{ figura }}</div>
        </div>
    </div>
</template>

<script setup>

  const props = defineProps({
    valor: String,
    figura: String
  });
</script>