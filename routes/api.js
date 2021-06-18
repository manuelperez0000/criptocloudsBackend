const express = require("express");
const axios = require("axios");
const router = express.Router();
var fs = require('fs');
var archivoJson = "apiCache/criptos.json";
var tiempoGuardado = "apiCache/time.txt";
var limit  = require('../nodelimiterfs/limiterfs');

const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
var db = firebase.firestore()

router.get('/criptosold',async(req,res)=>{
    try {
        const criptos = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=80&convert=usd",{
            headers:{
                'Type-content':'application/json',
                'X-CMC_PRO_API_KEY':'8c93e619-76d1-4732-b976-55eb10508ffc'
            }
        })

        objCriptos = criptos.data.data

        //aqui debo conectar a firebase y sacar las criptos
        var listaFireCriptos = ["BTC","ETH","USDT","DAI","XRP","LTC"]

        var objAux = []
        console.log(objCriptos.length)
        for (var i = 0; i < listaFireCriptos.length; i++){
            for(var j = 0; j < objCriptos.length; j++){
                if(objCriptos[j].symbol == listaFireCriptos[i]){
                    objAux.push({   
                        "name":objCriptos[i].name,
                        "id":objCriptos[i].id,
                        "symbol":objCriptos[i].symbol,
                        "price":objCriptos[i].quote.USD.price
                    })
                }
            }
        }

        res.json(objAux);

    } catch (error) {
        res.send(error)
    }
   
}) 

router.get('/criptos', async(req, res)=> {
    
    //tiempo a transcurrir en minutos
    var tac= 3

    //leer el ultimo tiempo del archivo
    var time = fs.readFileSync(tiempoGuardado, (err) => {console.log(err)});
    console.log("Tiempo Guardado: "+time);
    //leer el tiempo actual
    var tiempoNuevo = new Date();
    var sigT = tiempoNuevo.getTime();
    console.log("Tiempo ahora: "+sigT);
    var minTransurridos = ((sigT-time)/1000)/60;
   
    if(minTransurridos>tac){
        fs.writeFileSync(tiempoGuardado, sigT.toString(), e => console.log(e));
        console.log("van mas de "+tac+" minutos, total: ",minTransurridos);
        var coins = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=80&convert=usd',{
            headers:{
                "Content-type":"application/json",
                'X-CMC_PRO_API_KEY':'8c93e619-76d1-4732-b976-55eb10508ffc'
            }
        })
        //console.log("hora de responder")
        var datos = coins.data.data 

        var datosArreglados = await arregladordedatos(datos)

        var wdatos = JSON.stringify(datosArreglados)
        fs.writeFileSync(archivoJson,wdatos,(err)=>{
            console.log("Error en la escritura del archivo cod:"+err)
        });

        //toca guardar esto
        res.json(datosArreglados)
   }else{
    console.log("Solo van: ",minTransurridos);
    var criptosjson = fs.readFileSync(archivoJson);
    var objJson = JSON.parse(criptosjson);
    res.json(objJson);
    }

});

async function arregladordedatos(objCriptos){
    console.log("pasondo por el arreglador")
    var listaFireCriptos = []

    // -------------------
    const coinRef = db.collection('criptomonedas');
    const snapshot = await coinRef.get();
    if(snapshot.empty){
        console.log('No matching documents.');
        return;
    }else{
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data().criptos);
        listaFireCriptos = doc.data().criptos
        });
    }

    var objAux = []
    console.log(objCriptos.length)
    for (var i = 0; i < listaFireCriptos.length; i++){
        for(var j = 0; j < objCriptos.length; j++){
            if(objCriptos[j].symbol == listaFireCriptos[i]){
                objAux.push({   
                    "name":objCriptos[i].name,
                    "id":objCriptos[i].id,
                    "symbol":objCriptos[i].symbol,
                    "price":objCriptos[i].quote.USD.price
                })
            }
        }
    }
    return objAux

}

router.get('/limit',async(req,res)=>{
    const url='https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=80&convert=usd'
    const header = { "Content-type":"application/json", 'X-CMC_PRO_API_KEY':'8c93e619-76d1-4732-b976-55eb10508ffc' }
    var eco = await limit(url,5,header)
    res.json(eco)
})

module.exports = router;