<template>
 <section class="flex h-screen">
    <Tablero 
    :ScoreJugador="jugadorScore"
    :ScoreBot= "IAScore"
    :Stand="standcard"
    :Check="pedirCarta"
    :turnoV="turnoJuego === Turnos.Bot"
    :turnoI="turnoJuego === Turnos.Jugador"
    class="hidden lg:block z-10"
    />
    <section :style="{ backgroundImage: `url(${fondoCel})` }" class="fondo-vista hidden lg:flex flex-col w-screen justify-between p-9">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="z-10 w-full h-[150px] opacity-100 flex gap-1 justify-center">
        <carta v-show="turnoJuego === Turnos.Bot" v-for="IACarta in IACartas" :key="IACarta.id" :figura="IACarta?.figura" :valor="IACarta?.valor?.valorF" />
        <mazo v-for="IACarta in IACartas" v-show="turnoJuego === Turnos.Jugador" />
      </div>
      <div class="z-10 w-full text-8xl font-bold text-white">BLACKHACK</div>
      <div class="flex gap-4">
        <div class="z-10 w-full h-[150px]  flex gap-1 justify-center">
          <carta v-for="jugadorCarta in jugadorCartas" :key="jugadorCarta.id" :figura="jugadorCarta?.figura" :valor="jugadorCarta?.valor?.valorF"  /> 
        </div>
        <div class="z-10">
          <mazo v-show="turnoJuego === Turnos.Jugador" @click="pedirCarta" />
          <mazo v-show="turnoJuego === Turnos.Bot" />
         </div> 
      </div>
    </section>
    <section class="block lg:hidden">
      <vistaCel />
    </section>
 </section>
 <modalLoser :showModal="isModalLoserOpen" />
 <modalWin :showModal="isModalWinOpen" />
</template>

<script setup>
import Tablero from '../components/Tablero.vue';
import vistaCel from '../components/vistCelular.vue';
import { onMounted } from 'vue';
import carta from '../components/Carta.vue'
import Mazo from '../components/Mazo.vue'
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import modalLoser from '../components/modalLoser.vue';
import modalWin from '../components/modalWin.vue';
import fondoCel from '../components/fondoGame.jpg';

const isModalLoserOpen = ref(false);
const isModalWinOpen = ref(false);

const ModalOpen = () => {
  if(estadoJugador.value === estado.ganador) {
    isModalWinOpen.value = true;
  } else {
    isModalLoserOpen.value = true;
  }
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
  fetch('http://localhost:3001/ping', { 
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
       standcard();
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
  fetch('http://localhost:3001/nuevaCarta', {
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
          estadoJugador.value = estado.ganador;
          ModalOpen();
        } else if (IAScore.value === PuntuacionGanadora) {
          estadoJugador.value = estado.perdedor;
          ModalOpen();
        }
        return;
    } else {
      turnoJuego.value = Turnos.Jugador;
      jugadorCartas.value.push(data.nuevaCarta);
      jugadorScore.value = calcularPuntaje(jugadorCartas.value);
      
      if(jugadorScore.value > PuntuacionGanadora){
        estadoJugador.value = estado.perdedor
          ModalOpen();
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
      estadoJugador.value = estado.ganador;
      ModalOpen();
    } else if (jugadorScore.value < IAScore.value) {
      estadoJugador.value = estado.perdedor;
      ModalOpen();
    } else if (jugadorScore.value === PuntuacionGanadora && IAScore.value === PuntuacionGanadora) {
      estadoJugador.value = estado.perdedor;
      ModalOpen();
    } else if (jugadorScore.value === IAScore.value){
      estadoJugador.value = estado.perdedor;
      ModalOpen();
    }
  }
});

</script>

<style>
body {
    background-color: #B1BE96;
}
.fondo-vista {
    background-size: cover; /* Ajusta la imagen para que cubra toda el área */
    background-position: center; /* Centra la imagen */
    height: 100vh; /* Ocupa toda la altura de la vista */
    width: 100vw; /* Ocupa toda la anchura de la vista */
  }

</style>