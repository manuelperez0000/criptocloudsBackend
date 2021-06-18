var archivoJson = "apiCache/criptos.json";
var tiempoGuardado = "apiCache/time.txt";
var fs = require('fs');
const axios = require("axios");


const limit = async function(url,tiempo,header){
    var tac = tiempo

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
        var coins = await axios.get(url,{
            headers:header
        })
        //console.log("hora de responder")
        var datos = coins.data.data 
        var wdatos = JSON.stringify(datos)
        fs.writeFileSync(archivoJson,wdatos,(err)=>{
            console.log("Error en la escritura del archivo cod:"+err)
        });

        //toca guardar esto
        return datos
   }else{
    console.log("Solo van: ",minTransurridos);
    var criptosjson = fs.readFileSync(archivoJson);
    var objJson = JSON.parse(criptosjson);

    return objJson;

    }
}




module.exports = limit;