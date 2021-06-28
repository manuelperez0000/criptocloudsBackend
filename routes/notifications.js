const express = require("express");
const router = express.Router();
const firebase = require("firebase/app");
const  webpush  = require("web-push");
require("firebase/firestore");
require("firebase/auth");
var db = firebase.firestore()

const vapidkey = {
        "publicKey":"BIlfXfJh1uTbF0cQl6yxlBEtPZ6j_9N7IoxLBA9mu5Xoz3JQ7YKBdRVdFtXsQJI1xfz0Nkwp8SfxPXvHVzDbzj8",
        "privateKey":"xyalDDwCJxVmoW7Y6JH-w5V3Q9qEUO1jMXgP08rFlmk"
        }
    webpush.setVapidDetails(
        'mailto:admin@criptoclouds.com',
        vapidkey.publicKey,
        vapidkey.privateKey
    );

    async function enviarWeb(pushS,payload,i){
       await webpush.sendNotification(pushS,JSON.stringify(payload)).then((res)=>{
           console.log("enviado: "+i+" - "+res)
        }).catch(err=>{
            console.log("error:x "+i+" - "+err)
        })
    }

    
router.post('/send',async(req,res)=>{
    var obj = [
        {"endpoint": "https://bn3p.notify.windows.com/w/?token=BQYAAAAYDzaDJAG5Gp0W74KU1JeRg8G9kENq7%2fyjPj3i%2bK8Vi7CDqX%2bTIDl1dUgs2yW6nqfXtlAJRPgI9%2bw%2fWFyiWdMFK%2bvzJklCDEax%2fIUmqgQ%2b3nRq9vMxHfmsUNGpjXxzbZiP45MhqC8Yzp2ejmV%2bniwIExhIwta4w7fDJpu8OKcSDy%2bEmhqmDnS%2fdhgC6%2bak3N7R2ciIZIQJG4QCxAQr%2b4FVVrwrBA0bT1AZDQNFFQzXFw3WT4kn3%2bSDJGp1pCowe%2b9M%2fXKOUJIbcPYMxSBXKTrBTnvOquh7ij16mR55mjQA%2bervjf9I7zmKhzldh4D4NeORN0FlcV1OKPGSt1a4v9SQ", "expirationTime": null, "keys": { "p256dh": "BKxTnXMZogOSpzY7fQtaDwVBfvXPBdgGpbZrbMjpL8a5J16dYtoK6ibRW_jT1A2fovViYt0g17OFv-hPsgyojZI", "auth": "ilK6BENv0zglHLzov-uRUg" }},
        { "endpoint": "https://fcm.googleapis.com/fcm/send/cUIPbQYPMRA:APA91bG_jAFSbGISTrQUlbbzIjLdiM-vAXUB3jXHto0iyDRxKo5HKXsjEYTMwd8kD34_B9ZTzfZOLp2UtCiRg_kvco1rpVS34HPEW4SPrJ5VPAdr4Ek3tOGFcGgmz0LBukpBawBChSvQ", "expirationTime": null, "keys": { "p256dh": "BA2vPbhqHhLw4_I8ZOLeupwmMZUzhwoH2DyiMaorCOMlfWAk5pQDiN1j2jx_Z32K4p8VnXqC2TF2VM06wVUP4Yk", "auth": "--xNfUGmHrhi_WltpcFQ0A" } },
        { "endpoint": "https://fcm.googleapis.com/fcm/send/fsuR6JgQdPs:APA91bE-OKVq-cbfYoNeL5r9ORGYgSjkbcQblrKtx_ua_5YRdrtEnONOw-_TEngbqsH9u96WMoSY5KEm_x2bdLaDCQ2QtPH-464bzkO3Jm6tWGeziUEmaitvX0UESDiRWojdijeeu6O-", "expirationTime": null, "keys": { "p256dh": "BMeRt0z2bfnB0a11ph-2q_011l9mRl_JdeBIhSwEY8C8VBaXVbZV7lWnFRhp1cW2_2L_cVNZIrt_ID21_uHI1CE", "auth": "UFKNbpR1rXldaXkS-6dXbg" } },
        { "endpoint": "https://fcm.googleapis.com/fcm/send/fROIf4YjuLo:APA91bH__i0uzyJHZAkzx7P4XoLJ7_lE2YxQ2-MA-0WhmZafmrpi7iTb2AC632FH4wij6wDLrP9fsEga1fr6OHU74B1hOpcL4dOZkdDHOuFQ-L5n9oFCUWhpye6dRDAG6KIQUIUEbI-q", "expirationTime": null, "keys": { "p256dh": "BES-IPBOu-nX7KgGjxDz8-k-0bveZig41iqWbb7PKwPmax_QdMeSB8f3lCyBI5JoUtuTUsmSlhd892z-Mp9Cmdk", "auth": "ws6jl6pU2_ePdgtxgxVzaw" } }
    ]

    for(i=0;i<obj.length;i++){
        var pushS = obj[i]

        console.log("---------o--------- "+JSON.stringify(pushS))

        const payload = {
            notification:{
                title:"Aviso de nueva transaccion",
                body:"Tiene una transaccion pendiente",
                vibrate:[100,50,100],
                actions:[{
                    action:"explore",
                    title:"Confirmar"
                }]
            }
        }
        enviarWeb(pushS,payload,i)
    }
  
    res.send("Notificacion enviada con exito")
})

router.post('/save', async(req,res)=>{
    db.collection('notificaciones').add({
        endpoint:req.body.endpoint,
        auth:req.body.auth,
        p256dh:req.body.p256dh
    }).then((res)=>{
        console.log("Ejecutado el guardado de notificacion en firebaese: "+res)
    }).catch(err => console.log("error en guardado de endpoint firebase: "+err))
   // console.log(req.body)
    res.send(req.body) 
   
})

module.exports = router;