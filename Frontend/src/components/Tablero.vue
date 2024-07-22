<template>
    <seciton class="bg-[#3D4231] h-full px-4 py-9 border-[#D5DCA7] border-x-[4px]">  <!--TABLERO DE PUNTUACION-->
     <div class="h-full w-[380px] flex flex-col gap-[8px]">
      <div class="bg-[#C2CE6C] text-4xl font-bold rounded-md text-white border-black border-[1px] px-8 py-1"> BLACKHACK</div>
      <div class="bg-[#545a3a] text-white rounded-md">
        <div>All Club cards are debuffed</div>
        <div class="flex w-full justify-between px-5 py-2">
            <div class="rounded-full bg-[#B7C361] w-[100px] h-[100px]"></div>
            <div class="bg-[#30302c] rounded-md px-2 py-1">
                <div class="text-sm">Score at least</div>
                <div class="text-[#FF221B] text-5xl font-bold">30,000</div>
                <div class="text-sm">to earn <span class="text-xl text-[#FFCC51] font-bold">$$$$$</span></div>
            </div>
        </div>
      </div>
      <div class="flex bg-[#C2C36C] rounded-md border-black border-[1px] text-white justify-between gap-4 p-3">
        <div class="flex flex-col text-xl">
            <div>Jugador</div>
            <div>Score</div>
        </div>
        <div class="bg-[#393D2C] rounded-md w-full py-1 text-4xl"> {{ ScoreJugador }}</div>
      </div>
      <div class="flex bg-[#C2C36C] rounded-md border-black border-[1px] text-white justify-between gap-4 p-3">
        <div class="flex flex-col text-xl">
            <div>Bot</div>
            <div>Score</div>
        </div>
        <div class="bg-[#393D2C] rounded-md w-full py-1 text-4xl" v-show="props.turnoV"> {{ ScoreBot }}</div>
        <div class="bg-[#393D2C] rounded-md w-full py-1 text-4xl" v-show="props.turnoI"> ??? </div>
      </div>
    <div>
    </div>

    <!-- <div class="bg-[#202A24] text-white rounded-md p-2 flex flex-col gap-2">
      <div class="text-3xl font-bold">Flush <span class="text-sm font-medium">lvl.1</span></div>
      <div class="flex justify-center text-5xl font-bold gap-1">
        <div class="bg-[#006BE8] rounded-md pl-8">188</div>
        <div class="text-[#ff221B]">X</div>
        <div class="bg-[#ff221B] rounded-md pr-9">150</div>
      </div>
    </div> -->

    <div class="flex gap-5 justify-between">
      <div class="flex flex-col text-white gap-2">
        <div class="bg-[#FF221B] rounded-md px-4 py-9 hover:cursor-pointer hover:bg-black" v-show="props.turnoI" @click="props.Check">Check</div>
        <div class="bg-[#FF221B] rounded-md px-4 py-9 hover:cursor-pointer" v-show="props.turnoV">Check</div>
        <div class="bg-[#FA6C00] rounded-md px-5 py-9 hover:cursor-pointer hover:bg-black" v-show="props.turnoI" @click="props.Stand">Stand</div>
        <div class="bg-[#FA6C00] rounded-md px-5 py-9 hover:cursor-pointer hover:bg-black" v-show="props.turnoV">Stand</div>
      </div>

      <div class="flex flex-col text-white gap-3 w-full">
        <div class="flex gap-1 justify-center">
          <div class="bg-[#C2CE6C] rounded-md px-1 py-1 w-full">
            <div>Hands</div>
            <div class="bg-[#394129] rounded-lg text-3xl text-blue-600 font-bold px-7">0</div>
          </div>
          <div class="bg-[#C2CE6C] rounded-md px-1 py-1 w-full">
            <div>Discards</div>
            <div class="bg-[#394129] rounded-lg text-3xl text-red-600 font-bold px-7">0</div>
          </div>
        </div>
        <div class="bg-[#C2CE6C] text-[#FCB836] rounded-md px-2 py-1">
            <div class="text-5xl font-bold bg-[#394129] rounded-md py-2">$0</div>
        </div>
        <div class="flex gap-1">
            <div class="bg-[#C2CE6C] rounded-md px-1 py-1 w-full">
            <div>Ante</div>
            <div class="bg-[#394129] rounded-lg text-3xl text-orange-600 font-bold px-7">0<span class="text-white text-xl">/8</span></div>
          </div>
          <div class="bg-[#C2CE6C] rounded-md px-1 py-1 w-full">
            <div>Round</div>
            <div class="bg-[#394129] rounded-lg text-3xl text-orange-600 font-bold px-7">0</div>
          </div>
        </div>
      </div>
    </div>

   </div>
</seciton>  <!--TABLERO DE PUNTUACION-->
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  ScoreJugador: string;
  ScoreBot: string;
  Check: string;
  Stand: string;
  turnoV:string;
  turnoI: string;
}

const props = defineProps<Props>();



</script>