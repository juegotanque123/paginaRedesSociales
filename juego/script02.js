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
        varcolorBala="red";
        var centroX,centroY;
        var w,h;
        var puntos=0;
        var vidas=3;
        var finJuego=false;

        //Constantes para ancho y largo
        const BASE=500;
        const ALTURA=300;



        //Objetos
        function Bala(x,y,radianes){
            this.x=x;
            this.y=y;
            this.w=5;
            this.velocidad=8;
            this.radianes=radianes;
            this.dibuja=function{


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
            this.dibuja=funcion{

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


                }   
                else{
                    alert("Error al crear el contexto");
                }
            }
        }

        //Funcion para mover una bola
        function mover(){
            ctx.clearRect(0,0, BASE, ALTURA);

        

        }