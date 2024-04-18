var canvas=document.getElementById("miCanvas"); //para hacer referencia a un objeto element
var ctx= canvas.getContext('2d');//pincel para manipular el canvas
var sonidos= document.getElementById("sonidos");
var img = new Image();//para cargar la imagen
var im = new Image();//para cargar la imagen
var imag = new Image();//para cargar la imagen
img.src="buscaminas.jpeg";
//img.src="diferentestexturas.png";
im.src="caras.jpg";
imag.src="max.jpg";
//imag.src="bombafondo.jpeg";
var i=0,j=0;
var imx=0,imy=0;
var bo1=0, bo2=0;
var con=0,ban=0,banper=0,bangan=0;
var k,l,marcador=10;
let m=[];
var ix=140,iy=40;
var c,r;
var num=10;
var posicion = {x: 0, y: 0}, posicio = {x: 0, y: 0};

for (c=0;c<10;c++){
    m[c]=[];//cada columna ahora sera un arreglo
        for (r=0;r<10;r++){
            m[c][r]={
                x:0,                
                estado:0
            }
        }
}
for (c=0;c<10;c++){
        for (r=0;r<10;r++){
            m[c][r].x=0;
        }
}
img.onload=function(){  
limpiar();
dibujarfondo();
cuadro();
dibujarMarcador();
dibujarcara();
nuevo();
//brinda las coordenadas de la imagen y donde van a colocarse respectoa la matriz
coordenadas();   
		window.onload = function() {
			canvas.onmousemove = function(event) {
				posicion.x = Math.floor((event.clientX / 60));
				posicion.y = (Math.floor((event.clientY-83.6) / 60));
        posicio.x = Math.floor((event.clientX / 120));
				posicio.y= (Math.floor((event.clientY-23.6) / 60));
			}
      canvas.onmousedown=function(event){
        if(banper==0&&bangan==0){
          ix=485;
        dibujarcara();  
        }
              
      }
			canvas.onmouseup= function(event) {    
        if(posicio.x==0&&posicio.y==0){
          location.reload();
          return;
        }  else{   if(banper==0&&bangan==0){
                        if(event.which==1){
                         
                            ix=140;
                            dibujarcara();  
                                                                                             
                          if(ban==0){
                             disycuen(posicion.x,posicion.y);
                             fillMatrix1(posicion.x,posicion.y);
                             verificarganador();
                             ban=1;
                          }else{
                            
                          fillMatrix1(posicion.x,posicion.y)
                          if(verificarPerdedor()!=0)
                          verificarganador()
                               
                        }      
                                    
                       }
                        if(event.which==3){                         
                          if(m[posicion.x][posicion.y].estado==0){
				                    ctx.drawImage(img,0,568,286,286,posicion.x*60,posicion.y*60+60,60,60);
                            m[posicion.x][posicion.y].estado=2;
                            marcador--;                           
                            limpiar();
                            dibujarMarcador();
                            ix=140;
                          dibujarcara(); 
                          cuadro();   
                          nuevo();                                                             
                          }else{
                            if(m[posicion.x][posicion.y].estado==2){
                              m[posicion.x][posicion.y].estado=0;              
                              ctx.drawImage(img,0,0,286,286,posicion.x*60,posicion.y*60+60,60,60);
                              marcador++;
                              limpiar();
                            dibujarMarcador();
                            ix=140;
                          dibujarcara();
                          cuadro();
                          nuevo();
                            }             
             }
           
                       }
                      }
                    }
                    
			}			
		}
    }
    function verificarPerdedor() {
        for (let f = 0; f < 10; f++) {
          for (let c = 0; c < 10; c++) {
            //Si hay una mina descubierta, entonces se ha perdido
            if (m[f][c].x == 11) {
              if (m[f][c].estado == 1) {
                ix=370;
                dibujarcara()
                for(f=0;f<10;f++){
                  for(c=0;c<10;c++){
                    if (m[f][c].x == 11&&m[f][c].estado == 0) {
                      imx=(m[f][c].x%4)*286;
                      imy=(Math.floor(m[f][c].x/4))*286;        
                      ctx.drawImage(img,imx,imy,286,286,f*60,c*60+60,60,60);
                    }
                  }
                }
                perdio();
                return 0;
              }
            }
          }
        }
       
    }
    function baset(){
      num=parseInt(prompt("Cantidad de bombas: "));
      if(num>=92){
        alert("Son demasiadas bombas")
        location.reload();
      }
      if(num<=0){
        alert("Solo numeros positivos para la cantidad de bombas")
        location.reload();
      }      
      marcador=num;
      limpiar();
      cuadro();
      dibujarMarcador();
      dibujarcara();
      nuevo();
    }
    function limpiar(){
      ctx.clearRect(260,0,340,60);
      ctx.beginPath();
      ctx.rect(0,0,600,60);
      ctx.fillStyle="#ffffff";
      ctx.fill();
      ctx.closePath();
    }
    function cuadro(){
      ctx.beginPath();
      ctx.rect(0,0,120,60);
      ctx.fillStyle="#00ffff";
      ctx.fill();
      ctx.closePath();
    }
    function verificarganador() {
      contador=0;
      for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 10; c++) {
          //Si hay una casilla descubierta es una mina menos          
            if (m[f][c].estado == 1) {
             contador+=1
            }          
        }
      }if(contador==(100-num)){
        ix=602;
        dibujarcara();
        gano();
      }
     
  }
    function fillMatrix1(row, col){
    if (!(row >= 0 && row < 10 && col >= 0 && col < 10))
        return;
        
    if (m[row][col].estado == 1||m[row][col].estado == 2)
        return;
    
    m[row][col].estado = 1;
    imx=(m[row][col].x%4)*286;
    imy=(Math.floor(m[row][col].x/4))*286;        
    ctx.drawImage(img,imx,imy,286,286,row*60,col*60+60,60,60);
    if(m[row][col].x==4){
      fillMatrix1(row - 1, col-1);
      fillMatrix1(row - 1, col);
      fillMatrix1(row - 1, col+1);

      fillMatrix1(row, col - 1 );
      fillMatrix1(row, col + 1 );

      fillMatrix1(row + 1, col-1);    
      fillMatrix1(row + 1, col );    
      fillMatrix1(row + 1, col + 1 );}
}

function disycuen(x,y){
      //distribuye las minas
  for(j=0;j<num;j++){
  bo1=Math.floor(Math.random()*10);
  bo2=Math.floor(Math.random()*10);
  if(m[bo1][bo2].x!=11&&(bo1!=x||bo2!=y)&&(bo1!=x-1||bo2!=y-1)&&(bo1!=x||bo2!=y-1)&&(bo1!=x+1||bo2!=y-1)&&(bo1!=x-1||bo2!=y)&&(bo1!=x+1||bo2!=y)&&(bo1!=x-1||bo2!=y+1)&&(bo1!=x||bo2!=y+1)&&(bo1!=x+1||bo2!=y+1)){
  m[bo1][bo2].x=11;}
  else{
  j=j-1;
  }
  }
  //cuenta cuantas minas hay alrededor de una casilla
  for(j=0;j<10;j++){
    for(i=0;i<10;i++){
      if(m[j][i].x!=11){
        for (let e=j-1;e<=j+1;e++){
          for(let f=i-1;f<=i+1;f++){
            if(e>=0&&e<=9&&f>=0&&f<=9){
            if(m[e][f].x==11){
              con=con+1;
            } 
            }
          }
        }if(con==7 || con==8){
          con=con+2;
          }
          if(con==4 || con==5|| con==6){
          con=con+1;
          }
          if(con==0){
          con=4;
          }
          m[j][i].x=con;
          con=0;
      }
    }
  }
    }
    
function coordenadas(){
  for(j=0;j<10;j++){
    for(i=0;i<10;i++){
    if(m[j][i].x!=-1){
    imx=(m[j][i].x%4)*285;
    imy=(Math.floor(m[j][i].x/4))*285;
     ctx.drawImage(img,imx,imy,286,285,i*60,j*60+60,60,60);
}
}
}  
}
    function dibujarMarcador(){
      ctx.font="20px Arial";
      ctx.fillStyle="#000000";
      ctx.fillText("Minas restantes: "+marcador,canvas.width/4+50,35);
  }
  function gano(){
    ctx.font="20px Arial";
    ctx.fillStyle="#000000";
    ctx.fillText("Has ganado",canvas.width/4-120,35);
    sonidos.innerHTML='<audio src="ganar.mp3" autoplay></audio>';
    bangan=1;

}
function perdio(){
  ctx.font="20px Arial";
  ctx.fillStyle="#000000";
  ctx.fillText("Te has muerto",canvas.width/4-120,35);
  sonidos.innerHTML='<audio src="perder.mp3" autoplay></audio>';
  banper=1;
}
function nuevo(){
  ctx.font="20px Arial";
  ctx.fillStyle="#000000";
  ctx.fillText("Nuevo juego",1,35);
  
}
  function dibujarcara(){
    ctx.drawImage(im,ix,iy,120,140,130,0,80,60)
  }
  function dibujarfondo(){
    ctx.drawImage(imag,420,0,1000,718,600,0,860,660);
  }