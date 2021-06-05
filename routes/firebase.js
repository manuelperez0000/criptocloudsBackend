const express = require("express");
const router = express.Router();
//Firebase-Admin
const serviceAccount = require("../criptoclouds-4f775-firebase-adminsdk-5304g-3f75328e44.json");
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
 
const db = admin.firestore();

router.get('/precio-dolar', async(req, res)=>{
    const precioDolar = db.collection('precio-dolar').doc('usd-ves');
    const doc = await precioDolar.get();
    if (!doc.exists) {
    console.log('No such document!');
        datos = {
            precio:0,
            error:true
        }
        res.json({error:true})
    } else {
    console.log('Document data:', doc.data().precio);
        var precio = doc.data().precio
       /*  precio.push({error:false})  */
       datos = {
            precio,
            error:false
       }
        res.json(datos);
    }
});

router.get('/lista-criptos',async(req, res)=>{

    var criptoMonedas = db.collection('criptomonedas').doc('123456qwe');
    var doc = await criptoMonedas.get();
    var criptos = doc.data()
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log('Document data:'+criptos);
    }

    res.json({ criptos });

});

module.exports = router;