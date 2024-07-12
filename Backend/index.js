// //BACKEND CONEXION CON BD//

// import pg from 'pg'
// const { Client, Pool } = pg
// const client = new Pool()

// await client.connect()
//  try{
//     const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//     console.log(res.rows[0].message) 
//     response.status().json({sucees:true})
//  }catch{
//     response.status(400).json({sucees:false})
//  }finally{
//     await client.relase()
//  }




  //BACKEND HLACKHACK
import express from 'express';
import cors from 'cors';
import { stringify  } from 'uuid';
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const valorF = "string";
const valorS = "number";

const figuras = ['Corazones', 'Diamantes', 'Trebol', 'Picas'];
const valores = [
    {valorF: "2",valorS: 2},
    {valorF: "3",valorS:3},
    {valorF: "4",valorS: 4},
    {valorF: "5",valorS:5},
    {valorF: "6",valorS: 6},
    {valorF: "7",valorS: 7},
    {valorF: "8",valorS: 8},
    {valorF: "9",valorS: 9},
    {valorF: "J",valorS: 10},
    {valorF: "Q",valorS: 10},
    {valorF: "K",valorS: 10},
    {valorF: "A",valorS: [1, 11]},
];

let mazo = [];

function crearMazo() {
    const nuevoMazo = [];
    for (let figura of figuras) {
        for (let valor of valores) {
            nuevoMazo.push({ figura, valor });
        }
    }
    return nuevoMazo;
}

function barajearMazo(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
}

function repartoCarta(mazo, numCartas) {
    return mazo.splice(0, numCartas);
}

app.post('/ping', (req, res) => {
    mazo = crearMazo();
    mazo = barajearMazo(mazo);

    const jugadorCartas = repartoCarta(mazo, 2);
    const IACartas = repartoCarta(mazo, 2);

    res.status(201).json({
        message: 'Partida creada con éxito',
        jugadorCartas,
        IACartas
    });
});

app.post('/nuevaCarta', (req, res) => {
    if (mazo.length === 0) {
        return res.status(400).json({
            message: 'No hay más cartas en el mazo'
        });
    }

    const pedirCarta = repartoCarta(mazo, 1)[0];
    res.json({
        message: 'Carta repartida con éxito',
        nuevaCarta: pedirCarta 
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
