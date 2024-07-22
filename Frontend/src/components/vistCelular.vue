<template>
  <div class="flex flex-col h-screen">
    <section :style="{ backgroundImage: `url(${fondoCel})` }" class="fondo-vista flex flex-col justify-between p-2">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="z-10 w-full h-[150px] opacity-100 flex gap-1 justify-start">
        <carta v-show="turnoJuego === Turnos.Bot" v-for="IACarta in IACartas" :key="IACarta.id" :figura="IACarta?.figura" :valor="IACarta?.valor?.valorF" />
        <mazo v-for="IACarta in IACartas" v-show="turnoJuego === Turnos.Jugador" />
      </div>
      <div class="z-10 w-full text-5xl  text-white font-black">BLACKHACK</div>
      <div class="flex gap-4">
        <div class="z-10 w-full h-[150px]  flex gap-1 justify-start">
          <carta v-for="jugadorCarta in jugadorCartas" :key="jugadorCarta.id" :figura="jugadorCarta?.figura" :valor="jugadorCarta?.valor?.valorF"  /> 
        </div>
      </div> 
    </section>

    <section class="bg-[#3D4231] w-full h-full text-white z-10">
      <div class="flex w-full h-1/2 gap-4 p-4 justify-center items-center">
        <div class="w-1/2 h-full p-2 rounded-md bg-[#C2C36C]">
          <div class="h-1/3 text-3xl font-black">MiScore</div>
          <div class="h-2/3 bg-[#393D2C] rounded-md flex items-center justify-center text-7xl font-black">{{ jugadorScore }}</div>
        </div>
        <div class="w-1/2 h-full p-2 rounded-md bg-[#C2C36C]">
          <div class="h-1/3 text-3xl font-black">ScoreBot</div>
          <div  v-show="turnoJuego === Turnos.Bot" class="h-2/3 bg-[#393D2C] rounded-md flex items-center justify-center text-7xl font-black">{{ IAScore }}</div>
          <div v-show="turnoJuego === Turnos.Jugador" class="h-2/3 bg-[#393D2C] rounded-md flex items-center justify-center text-7xl font-black">???</div>
        </div>
      </div>
      <div class="flex w-full h-1/2 gap-4 p-4 justify-center items-center">
        <div class="w-1/2 h-full">
          <Boton 
          v-show="turnoJuego === Turnos.Jugador"
          @click="standcard"
          text="Stand"
          class="w-full h-full text-4xl" 
          />
          <Boton 
          v-show="turnoJuego === Turnos.Bot"
          text="Stand"
          class="w-full h-full text-4xl" 
          />
        </div>
        <div class="w-1/2 h-full">
          <Boton 
          v-show="turnoJuego === Turnos.Bot"
          text="Check" 
          class="w-full h-full text-4xl"
          />
            <Boton 
          @click="pedirCarta"
          v-show="turnoJuego === Turnos.Jugador"
          text="Check" 
          class="w-full h-full text-4xl"
          />
        </div>
      </div>
    </section>
  </div>  
  <modalLoser :showModal="isModalLoserOpen" />
  <modalWin :showModal="isModalWinOpen" />
</template>
  
<script setup>
import fondoCel from './fondoGame.jpg';
import { onMounted } from 'vue';
import carta from '../components/Carta.vue'
import Mazo from '../components/Mazo.vue'
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import modalLoser from '../components/modalLoser.vue';
import modalWin from '../components/modalWin.vue';
import Boton from '../components/BotonVerde.vue';

const isModalLoserOpen = ref(false);
const isModalWinOpen = ref(false);


const ModalOpenD = (estado) => {
   setTimeout(() => {
     if (estado === 'ganador') {
       isModalWinOpen.value = true
     } else {
       isModalLoserOpen.value = true
     }
   }, 1000)
 }



const success1 = () => {
  message.success({
    content: () => 'Turno del contrincante',
    class: 'custom-class',
    style: {
        duration: 5,
    },
  });
};


const Turnos = {
    Jugador: 'Jugador',
    Bot: 'IA',
}

const estado = {
  ganador: 'ganador',
  perdedor: 'perdedor'
}

const estadoJugador = ref(estado);
const turnoJuego = ref(Turnos);
const jugadorScore = ref('');
const IAScore = ref ('');
const jugadorCartas = ref ([]);
const IACartas = ref([]);
const PuntuacionGanadora = 21;



const calcularPuntaje = (cartas) => {
    let total = 0;
    let ases = 0;

    for (const carta of cartas) {
        if (carta.valor.valorF === 'A') {
            ases += 1;
            total += 11;
        } else {
            total += carta.valor.valorS;
        }
    }

    while (total > 21 && ases > 0) {
        total -= 10; 
        ases -= 1;
    }

    return total;
}

onMounted(() => {
  fetch('https://blackhack-api2.onrender.com/ping', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  }).then(data => {
    jugadorCartas.value = data.jugadorCartas;
    IACartas.value = data.IACartas;
    jugadorScore.value = calcularPuntaje(data.jugadorCartas);
    IAScore.value = calcularPuntaje(data.IACartas);
    if (jugadorScore.value === PuntuacionGanadora) {
      turnoJuego.value = Turnos.Bot
       standcard();
       if (jugadorScore.value > IAScore.value) {
        ModalOpenD(estado.ganador);
        ModalOpen();
       }
    } else {
      turnoJuego.value = Turnos.Jugador;
    }
    
  }).catch(error => {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  })
    }
);


const pedirCarta = () => {
  fetch('https://blackhack-api2.onrender.com/nuevaCarta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  }).then(data => {
    if (turnoJuego.value === Turnos.Bot) {
      turnoJuego.value = Turnos.Bot;
      IACartas.value.push(data.nuevaCarta);
      IAScore.value = calcularPuntaje(IACartas.value);
        if (IAScore.value > PuntuacionGanadora) {
          ModalOpenD(estado.ganador);
        } else if (IAScore.value === PuntuacionGanadora) {
          ModalOpenD(estado.perdedor);
        }
        return;
    } else {
      turnoJuego.value = Turnos.Jugador;
      jugadorCartas.value.push(data.nuevaCarta);
      jugadorScore.value = calcularPuntaje(jugadorCartas.value);
      
      if(jugadorScore.value > PuntuacionGanadora){
        ModalOpenD(estado.perdedor);
      } else if (jugadorScore.value === PuntuacionGanadora){
        turnoJuego.value === Turnos.Bot
      }
    }
  }).catch(error => {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  });
};

const standcard = () => {
  success1()
 turnoJuego.value = Turnos.Bot
}

watch(turnoJuego, async (newValue) => {
  if (newValue === Turnos.Bot) {
    while (IAScore.value < 17) {
      await pedirCarta();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (jugadorScore.value < 21 && jugadorScore.value > IAScore.value) {
      ModalOpenD(estado.ganador);
    } else if (jugadorScore.value < IAScore.value) {
      ModalOpenD(estado.perdedor);
    } else if (jugadorScore.value === PuntuacionGanadora && IAScore.value === PuntuacionGanadora) {
      ModalOpenD(estado.perdedor);
    } else if (jugadorScore.value === IAScore.value){
      ModalOpenD(estado.perdedor);
    }
  }
});

</script>
  
  <style>
  .fondo-vista {
    background-size: cover; 
    background-position: center; 
    height: 100vh; 
    width: 100vw; 
  }
  </style>