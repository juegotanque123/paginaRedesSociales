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