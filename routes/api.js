const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/criptos',async(req,res)=>{
    try {
        const criptos = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=80&convert=usd",{
            headers:{
                'Type-content':'application/json',
                'X-CMC_PRO_API_KEY':'8c93e619-76d1-4732-b976-55eb10508ffc'
            }
        })

        objCriptos = criptos.data.data
        var objAux = []
        console.log(objCriptos.length)

        for (var i = 0; i < objCriptos.length; i++) {
            if( objCriptos[i].symbol == "BTC" || 
                objCriptos[i].symbol == "ETH" ||
                objCriptos[i].symbol == "USDT" ||
                objCriptos[i].symbol == "DAI" ||
                objCriptos[i].symbol == "XRP" ||
                objCriptos[i].symbol == "LTC" ||
                objCriptos[i].symbol == "DOGE" ||
                objCriptos[i].symbol == "DASH" ||
                objCriptos[i].symbol == "BNB" ||
                objCriptos[i].symbol == "XMR" ||
                objCriptos[i].symbol == "ADA" ||
                objCriptos[i].symbol == "DOT"
                ){
                    objAux.push({   "name":objCriptos[i].name,
                                    "id":objCriptos[i].id,
                                    "symbol":objCriptos[i].symbol,
                                    "price":objCriptos[i].quote.USD.price
                            })
            }
            console.log(objAux) 
        }
        res.json(objAux);
    } catch (error) {
        res.send(error)
    }
   
}) 
/* 
router.get('/criptos',(req,res)=>{
    res.json([
    {
        "name":"Bitcoin",
        "id":1,
        "symbol":"BTC",
        "price":37120
    },{
        
        "name":"Manucoin",
        "id":666,
        "symbol":"m666",
        "price":1000
    }])
}) */


module.exports = router;