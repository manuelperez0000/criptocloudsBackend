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

var datos = {}
var urlCommon = `https://identitytoolkit.googleapis.com/v1/accounts:`
var urlReg = `${urlCommon}signUp?key=${ firebaseConfig.apiKey }`
var urlLog = `${urlCommon}signInWithPassword?key=${ firebaseConfig.apiKey }`
router.post('/login',  async(req, res)=>{
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
});

router.post('/register', async(req,res)=>{
    datos = {
        "email":req.body.email,
        "password":req.body.password
    }
    var rr = await axios.post(urlReg, datos)
      .then(respuesta=> { return respuesta })
      .catch(error => { return error });

    res.json(rr.data)
});

module.exports = router;