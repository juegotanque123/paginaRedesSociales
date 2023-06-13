//Variables globales
var canvas, ctx;
var x,y,r;
var imagen;
var radianes;
var enemigo, bala;
var BARRA=32;
var teclaPulsada=null;
var tecla_array=new Array();
var balas_array=new Array();
var enemigos_array=new Array();
var colorEnemigo=["red","blue","black","white","yellow","pink","purple"];
var simboloEnemigo=["facebook", "discord","square-whatsapp", "pinterest","twitter", "telegram", "youtube","tiktok", "-square-instagram", "square-snapchat","reddit", "square-tumblr"]


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
        ctx.fillStyle="red";
        this.x +=Math.cos(this.radianes)*this.velocidad;
        this.y +=Math.sin(this.radianes)*this.velocidad;
        ctx.fillRect(this.x,this.y, this.w, this.w);
        ctx.restore();

    }
}

function Tanque(x,y,radio, imagenSeleccionada){
    this.x=x;
    this.y=y;
    this.radio=radio;
    this.escala=1;
    this.rotacion=0;
    this.w=0;
    this.h=0;
    this.dibuja=function(){
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
    this.w=this.r*2;
    this.vive=true
    this.velocidad=3+Math.random();
    var ColorR=Math.floor(Math.random()*256);
    var ColorG=Math.floor(Math.random()*256);
    var ColorB=Math.floor(Math.random()*256);
    this.color=`rgba(${ColorR},${ColorG},${ColorB}, 1)`;

    //this.color=colorEnemigo[Math.floor(Math.random()*colorEnemigo.length)];
    this.dibuja=function(){
        if(this.n<100 && this.vive){
            
            ctx.save();
                  // Si el color es azul, dibujar la imagen
            if (ColorR < 50 && ColorG < 50 && ColorB > 200) {
                var img = new Image();
                img.src = "../img/ficon.jpg";
                ctx.drawImage(img, this.x - this.r, this.y - this.r, this.w, this.w);
            }else if(ColorR >200 && ColorG < 50 && ColorB <50){
                var img = new Image();
                img.src = "../img/redguy.png";
                ctx.drawImage(img, this.x - this.r, this.y - this.r, this.w, this.w);

            }else if(ColorR >200 && ColorG < 50 && ColorB <50){
                var img = new Image();
                img.src = "../img/twitch.png";
                ctx.drawImage(img, this.x - this.r, this.y - this.r, this.w, this.w);
            }else {
                ctx.fillStyle=this.color;
                ctx.beginPath();
                ctx.arc(this.x,this.y, this.r, 0,2*Math.PI);
                ctx.fill();
            }
            this.n +=0.5;
            this.x=centroX*this.n/100+this.inicioX*(100-this.n)/100;
            this.y=centroY*this.n/100+this.inicioY*(100-this.n)/100;
            ctx.restore();

            // Dibujar la letra en el centro del círculo
            ctx.save();
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("", this.x, this.y);
            ctx.restore();
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
            if(balas_array[i].x<0 || balas_array[i].x>w || balas_array[i].y<0|| balas_array[i].y>h){
                balas_array[i]=null;
            }
        }
    }
    for(var i=0; i<enemigos_array.length; i++){
        if(enemigos_array[i] !=null){
            enemigos_array[i].dibuja();
        }
    }

    score()

}

function inicio(){
    tanque.dibuja();
    setTimeout(lanzaEnemigo, 1000);
    anima()
}
function anima(){
    if(finJuego==false){
        requestAnimationFrame(anima);
        verifica();
        pinta();
        colisiones();
    }

}

//Listener



document.addEventListener("keydown", function(e){
    teclaPulsada=e.keyCode;
    tecla_array[teclaPulsada]=true;
});


function verifica(){
    if(tecla_array[BARRA]){
        var balaX = centroX + Math.cos(radianes) * 35;
        var balaY = centroY + Math.sin(radianes) * 35;
        balas_array.push(new Bala(balaX, balaY, radianes));
        tecla_array[BARRA] = false;
        disparo.play();
    }
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

            if(enemigo !=null && bala !=null){

                if(bala.x>enemigo.x && bala.x<enemigo.x+enemigo.w && bala.y>enemigo.y && bala.y<enemigo.y+enemigo.w){

                    enemigo.vive=false;
                    enemigos_array[i]=null;
                    balas_array[j]=null;
                    puntos +=10;
                    boing.play();
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
        if(puntos==100){
            victory()
        }

    }


}


function gameOver(){
    mensaje("GAME OVER");
    ctx.save();
    ctx.fillStyle="black";
    ctx.clearRect(0,0, BASE,40);
    ctx.font="bold 20px Courier";
    ctx.fillText("SCORE: "+puntos,BASE/2-50,ALTURA/2+50);
    ctx.restore();
    finJuego=true;
    fin.play();
}
function victory(){
    mensaje("GANASTE");
    ctx.save();
    ctx.fillStyle="black";
    ctx.clearRect(0,0, BASE,40);
    ctx.font="bold 20px Courier";
    ctx.fillText("SCORE: "+puntos+" VIDAS:"+vidas, BASE/2-100,ALTURA/2+50);
    ctx.restore();
    finJuego=true;
    plants.play()
}

function score(){
    ctx.save();
    ctx.fillStyle="black";
    ctx.clearRect(0,0, BASE,40);
    ctx.font="bold 20px Courier";
    ctx.fillText("SCORE: "+puntos+" VIDAS:"+vidas, 10,20);
    ctx.restore();
}

function mensaje(cadena){
    var lon=(canvas.width-(53*cadena.length))/2-70;
    ctx.save();
    ctx.fillStyle="black";
    ctx.clearRect(0,0,w,h);
    ctx.font="bold 100px Rosewood Std";
    ctx.fillText(cadena,lon, 220);
    ctx.restore();
}
function sonar(){

}

function mostrarImagenes() {
    var imagenes = document.querySelectorAll("#imagen-container img");
  
    for (var i = 0; i < imagenes.length; i++) {
      imagenes[i].style.display = "inline-block";
    }
  
  }


function iniciarJuego(imagenSeleccionada) {
    var imagenes = document.querySelectorAll("#imagen-container img");
  
    for (var i = 0; i < imagenes.length; i++) {
      imagenes[i].style.display = "none";
    }
  
    // Aquí puedes iniciar el juego con la imagen seleccionada
    // y realizar otras acciones necesarias
    if(imagenSeleccionada=="../img/tanquew.png"){
        var timg="../img/tanquew.png"


    }else if(imagenSeleccionada=="../img/tanquef.png"){
        var timg="../img/tanquef.png"


    }else if(imagenSeleccionada=="../img/tanquet.png"){
        var timg="../img/tanquet.png"

    }
    imagen.src=timg

    
    inicio();

    setTimeout(inicio, 3500);

    console.log("Juego iniciado con la imagen:", imagenSeleccionada);
  }


window.onload=function()
{
    mostrarImagenes()

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
            var boom=document.getElementById("boom");
            var plants=document.getElementById("plants");

            document.addEventListener("click", function() {
                intro.play();
              });
            w=BASE;
            h=ALTURA;
            centroX=w/2;
            centroY=h/2;
            imagen=new Image();
            tanque= new Tanque();
            mensaje("TANQUES");


        }   
        else{
            alert("Error al crear el contexto");
        }
    }

}
function ajusta(xx,yy){
    var pos=canvas.getBoundingClientRect();
    var x=xx-pos.left;
    var y=yy-pos.top;
    return{x:x,y:y}
}
document.addEventListener("mousemove", function(e){
    var pos=ajusta(e.clientX,e.clientY);
    var x=pos.x;
    var y=pos.y;
    var dx=x-centroX;
    var dy=y-centroY;
    radianes=Math.atan2(dy,dx);
})

