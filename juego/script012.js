//Variables globales
var canvas, ctx;
var x,y;
var imagen;
var radianes;
var enemigo, bala;
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
    this.dibuja=function(){
        ctx.save();
        ctx.fillStyle=colorBala;
        this.x +=Math.cos(this.radianes)*this.velocidad;
        this.y +=Math.sin(this.radianes)*this.velocidad;
        ctx.fillRect(this.x,this.y, this.w, this.w)
        ctx.restore()
    }
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
        if(this.n<100 && this.vive){
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x,this.y, this.r, 0,2*Math.PI);
            ctx.fill();
            this.n +=this.velocidad;
            this.x=centroX*this.n/100+this.inicioX*(100-this.n)/100;
            this.inicioX=centroY*this.n/100+this.inicioY*(100-this.n)/100;
            ctx.restore();
        }

    }
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

function pinta(){
    ctx.clearRect(0,0, BASE, ALTURA);
    ctx.save();
    ctx.translate(centroX,centroY)
    ctx.scale(tanque.escala, tanque.escala);
    ctx.rotate(radianes);
    ctx.drawImage(imagen,-imagen.width/2,-imagen.height/2);
    ctx.restore();

    for(var i=0; i<balas_array.length; i++){
        if(balas_array[i]!=null){
            balas_array[i].dibuja();
            if(balas_array[i].x<0 || balas_array.x[i]>w || balas_array.y[i]<0|| balas_array[i]>h){
                balas_array[i]=null
            }
        }
    }
    for(var i=0; i<enemigos_array.length; i++){
        if(enemigos_array[i]!=null){
            enemigos_array[i].dibuja();
        }
    }

    score()

}

function anima(){
    requestAnimationFrame(anima);
    verifica();
    pinta();
    colisiones();
}

document.addEventListener("mousemove", function(e){
    var pos=ajusta(e.clientX,e.clientY);
    var x=pos.x;
    var y=pos.y;
    var dx=x-centroX;
    var dy=y-centroY;
    radianes=Math.atan2(dy,dx);
})

document.addEventListener("keydown", function(e){
    teclaPulsada=e.keyCode;
    tecla_array[teclaPulsada]=true
})

function ajusta(xx,yy){
    var pos=canvas.getBoundingClientRect();
    var x=xx-pos.left;
    var y=yy-pos.top;
    return{x:x,y:y}
}

function verifica(){
    if(tecla_array[BARRA]){
        balas_array.push(
            new Bala(centroX+Math.cos(radianes)*35, centroY+Math.sin(radianes)*35))
            tecla_array[BARRA]=false;
            disparo.play();
    }
}

function inicio(){
    tanque.dibuja();
    setTimeout(lanzaEnemigo, 1000);
    anima()
}


function lanzaEnemigo(){
    var lado=Math.floor(Math.random()*4)+1;
    //Izquierda
    if(lado==1){
        x= -10;
        y=Math.floor(Math.random()*h)
    }else if(lado==2){
        x=Math.floor(Math.random()*w)
        y= -10;
    }else if(lado==3){
        x=w+Math.random()*10;
        y= Math.floor(Math.random()*h);
    }else if(lado==4){
        x= Math.floor(Math.random()*w);
        y=h+Math.random()*10;
    }
    enemigos_array.push(new Enemigo(x,y));
    setTimeout(lanzaEnemigo,2000);
}

function colisiones(){
    for(var i=0; i<enemigos_array.length; i++){
        for(var j=0; j<enemigos_array.length; j++){
            enemigo=enemigos_array[i];
            bala=balas_array[j];
            if(enemigo !=null && bala!=null){
                if(bala.x>enemigo.x && bala.x<enemigo.x+enemigo.w && bala.y>enemigo.y && bala.y<enemigo.y+enemigo.w){
                    enemigo.vive=false;
                    enemigos_array[i]=null;
                    balas_array[i]=null;
                    puntos +=10;
                    boing.pĺay();
                } 
            }
        }
        if(enemigos_array[i] !=null){
            enemigo=enemigos_array[i];
            if(enemigo.n>95){
                enemigo.vive=false;
                enemigos_array[i]=null;
                vidas -=1;
                boom.play()
                if(vidas==0)gameOver()
            }
        }

    }

}


function gameOver(){
    alert("Fin del Juego")
}

function score(){
    ctx.save();
    ctx.fillStyle="white";
    ctx.clearRect(0,0, BASE,40);
    ctx.font="bold 20px Courier";
    ctx.fillText("SCORE:"+puntos+"VIDAS:"+vidas, 10,20);
    ctx.restore();
}