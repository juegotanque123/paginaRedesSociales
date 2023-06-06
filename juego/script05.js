//Variables globales
var canvas, ctx;
var x,y;
var imagen;
var radianes;
var BARRA=32;
var teclaPulsada=null;
var tecla_array=new Array();
var balas_array=new Array();
var enemigos_array=new Array();
var colorEnemigo=["red","blue","black","white","yellow","pink","purple"];
var colorBala="red";
var centroX,centroY;
var w,h;
var puntos=0;
var vidas=3;
var finJuego=false;
var tanque;

//Constantes para ancho y largo
const BASE=800;
const ALTURA=400;



//Objetos
function Bala(x,y,radianes){
    this.x=x;
    this.y=y;
    this.w=5;
    this.velocidad=8;
    this.radianes=radianes;
    this.dibuja=function(){}
}

function Tanque(x,y,radio){
    this.x=x;
    this.y=y;
    this.radio=radio;
    this.escala=1;
    this.rotacio=0;
    this.w=0;
    this.h=0;
    this.dibuja=function(){
        imagen.src="../img/tanque.png";
        imagen.onload=function(){
            this.w=BASE;
            this.h=ALTURA;
            var ww=this.w/2
            var hh=this.h/2
            ctx.drawImage(imagen, centroX-ww,centroY-hh);

        }

    }
}
function Enemigo(x,y){
    this.n=0;
    this.x=x;
    this.y=y;
    this.inicioX=x;
    this.inicioY=y;
    this.estado=1;
    this.r=10;
    this.w=r*2;
    this.vive=true
    this.velocidad=3+Math.random();
    this.color=colorEnemigo[Math.floor(Math.random()*colorEnemigo.length)];
    this.dibuja=function(){

    }
}
function mover(){
    ctx.clearRect(0,0, BASE, ALTURA);

}


window.onload=function()
{

    canvas=document.getElementById("miCanvas");
    canvas.width=BASE;
    canvas.height=ALTURA;



    if(canvas && canvas.getContext)
    {
        ctx=canvas.getContext("2d");

        if(ctx){
            
            //alert("Bienvenido al Canvas");
            //Graficar
            var boing=document.getElementById("boing");
            var disparo=document.getElementById("disparo");
            var intro=document.getElementById("intro");
            var fin=document.getElementById("fin");
            var boom=document.getElementById("boom")
            //intro.play();
            w=BASE;
            h=ALTURA;
            centroX=w/2;
            centroY=h/2;
            imagen=new Image();
            tanque= new Tanque();

            // setTimeout(inicio, 5);

        }   
        else{
            alert("Error al crear el contexto");
        }
    }
    
}

document.addEventListener("mousemove", function(e){
    var pos=ajusta(e.clientX,e.clientY);
    var x=pos.x;
    var y=pos.y;
    var dx=x-centroX;
    var dy=y-centroY;
    radianes=Math.atan2(dy,dx);
})

function ajusta(xx,yy){
    var pos=acanvas.getBoundingClientRect();
    var x=xx-pos.left;
    var y=yy-pos.top;
    return{x:x,y:y}
}