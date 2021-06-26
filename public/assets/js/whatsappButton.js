function sendWathsapp(tipo){
    if(tipo==0){
       var email  = document.getElementById('email').value
       var banco  = document.getElementById('banco').value
       var coin   = document.getElementById('coin').value
       var ves    = document.getElementById('ves').value
       var amount = document.getElementById('amount').value
       var wallet = document.getElementById('wallet').value
   
       var direccion = "https://api.whatsapp.com/send?phone=584141220527&text=Nombre-Cliente--Tipo-de-transeccion:Compra%20--Banco:"+banco+"%20--%20email:"+email+"%20--%20Cripto:"+coin+"%20--%20Monto%20Bolivares:"+ves+"%20--%20Cantidad%20Cripto:"+amount+"%20--%20Direccion-Wallet:"+wallet;
       direccion = direccion.toString()
       window.location.href = direccion

    }else{
        console.log("se ejecuta la venta")
        var email  =  document.getElementById('email').value;
        var banco  =  document.getElementById('banco').value;
        var coin   =  document.getElementById('coin').value;
        var ves    =  document.getElementById('ves').value;
        var amount =  document.getElementById('amount').value;
        var tipoC  =  document.getElementById('tipo').value;
        var nroCta =  document.getElementById('nroCuenta').value;
        var cedula  = document.getElementById('cedula').value;
        var titular = document.getElementById('titular').value;

        var direccion2 = "https://api.whatsapp.com/send?phone=584141220527&text=Nombre-Cliente----Tipo-de-transeccion:Venta%20--%20Banco:"+banco+"%20--%20email:"+email+"%20--%20Cripto:"+coin+"%20--%20Monto%20Bolivares:"+ves+"%20--%20Cantidad%20Cripto:"+amount+"%20--%20Tipo-de-cuenta:"+tipoC+"%20--%20Numero-de-cuenta:"+nroCta+"%20--%20Cedula:"+cedula+"%20--%20Titular:"+titular;

        direccion2 = direccion2.toString();
        window.location.href = direccion2;

    }

}

function continuarAlCajero(){

    var monto = document.getElementById('monto').value;
    var retiro = document.getElementById('retiro').value;

    var direccion3 = "https://api.whatsapp.com/send?phone=584141220527&text=Nombre-Cliente----Retiro-saldo-nimbus:%20$USD"+retiro+"--Total-en-Bs:%20"+monto;

    direccion3 = direccion3.toString();
    window.location.href = direccion3;
}