const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
//Firebase-Admin
/* const serviceAccount = require("../criptoclouds-4f775-firebase-adminsdk-5304g-3f75328e44.json");
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
 
const db = admin.firestore();
const auth = admin.auth(); */

const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4",
    authDomain: "criptoclouds-4f775.firebaseapp.com",
    projectId: "criptoclouds-4f775",
    storageBucket: "criptoclouds-4f775.appspot.com",
    messagingSenderId: "861526500096",
    appId: "1:861526500096:web:c1497d58778672907509e5"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.firestore();

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

router.post('/calificacion',(req,res)=>{
    var calificacion = db.collection('calificacion');
    calificacion.add({
        estrellas:req.body.estrellas
    })
    console.log(req.body.estrellas)
    res.end()
})

router.post('/contact',(req,res)=>{
    var contact = db.collection('contacto');
    contact.add({
        email:req.body.email,
        nombre:req.body.nombre,
        comentario:req.body.textarea
    })
    res.end()
    
})

router.post('/secondUserReg',(req,res)=>{
    console.log("hola desde secondUserReg")
    var registro = db.collection('usuarios-registrados');
    registro.doc(req.body.email).set({
        nombre:req.body.nombre,
        cedula:req.body.cedula,
        telefono:req.body.telefono,
        email:req.body.email,
        saldoNimbus:0
        })
        
    console.log("siguiente paso")
    res.json({estado:"bien"})
})

router.get('/getUser/:email', async(req,res)=>{
    var email = req.params.email
    var nombre
    var cedula
    var telefono
    var saldoNimbus
    const user = db.collection('usuarios-registrados');
    const snapshot = await user.where('email', '==', email).get();
    if (snapshot.empty) {
        console.log('No se encontro ningun usuario');
    return;
    }
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    nombre = doc.data().nombre
    cedula = doc.data().cedula
    telefono = doc.data().telefono
    saldoNimbus = doc.data().saldoNimbus

    });

    res.json({
        email,
        cedula,
        nombre,
        telefono,
        saldoNimbus
    })
})
/* var datos = {}
var urlCommon = `https://identitytoolkit.googleapis.com/v1/accounts:`
var urlReg = `${urlCommon}signUp?key=${ firebaseConfig.apiKey }`
var urlLog = `${urlCommon}signInWithPassword?key=${ firebaseConfig.apiKey }` */
/* router.post('/login',  async(req, res)=>{
    datos = {
        "email":req.body.email,
        "password":req.body.password
    }
    var rr = await axios.post(urlLog, datos)
      .then(function (respuesta) {
       return respuesta
      })
      .catch(function (error) {
        return error
      });
    res.json(rr.data)
}); */

/* router.post('/register', async(req,res)=>{
    datos = {
        "email":req.body.email,
        "password":req.body.password
    }
    var rr = await axios.post(urlReg, datos)
      .then(respuesta=> { return respuesta })
      .catch(error => { return error });

    res.json(rr.data)
}); */

module.exports = router;