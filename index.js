// variables para dimensionar y controlar
// 1.1 toma de tamaños de la pantalla
var anchoPantalla = screen.width * 0.7;
var altoPantalla = screen.height * 0.8;

var posicionInferiorPlataforma = altoPantalla - 25;
var posicionInicialPlataformaHoriz = anchoPantalla / 2;

var posicionBolaHoriz = anchoPantalla / 2;
var posicionBolaVert = altoPantalla / 2;

var contador = 0;

var velocidad = 0;

  // Beta: Se crea la clase con el metodo Constructor, preload, create

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('fondo', './imgs/fondo.jpg');
        this.load.image('plataforma', './imgs/plataforma.png');
        this.load.image('bola', './imgs/bola.png');
    }

    create (){
      this.add.image(400, 300, 'fondo');

      //9- Agregar que la pantalla permita que las cosas choquen con algunos de sus bordes
      this.physics.world.setBoundsCollision(true, true, true, false);  

      //1- hacer aparecer la plataforma
      // this.platform = this.physics.add.image(posicionInicialPlataformaHoriz, posicionInferiorPlataforma, 'plataforma');
      //agregar a la plataforma una propiedad de forma tal de que esta no se mueva al recibir la bola
      this.platform = this.physics.add.image(posicionInicialPlataformaHoriz, posicionInferiorPlataforma, 'plataforma').setImmovable();
      //2- quitarle la gravedad
      this.platform.body.allowGravity = false;

      //3- agregar la animacion con cursores del teclado
      this.cursors = this.input.keyboard.createCursorKeys();

      //5- hacer aparecer la bola en el juego
      this.ball = this.physics.add.image(posicionBolaHoriz, posicionBolaVert, 'bola');

      

      //10- Ademas hay que hacer que determinados elementos puedan colisionar con los bordes del mundo
      this.ball.setCollideWorldBounds(true);

      //8- Crear una velocidad y un direccionamiento aleatorio
      velocidad = 100 * Phaser.Math.Between(1.2, 2);
      if(Phaser.Math.Between(0, 10) > 5){
        velocidad = 0 - velocidad;
      }
      this.ball.setVelocity(velocidad, 10);

      //6- crear colision entre bola y plataforma
      this.physics.add.collider(this.ball, this.platform, this.sumarPuntos, null, this);

      //7-programar el rebote de la bola cuando choque con algo
      this.ball.setBounce(1);


    }

    // 13 paso por parametros los objetos que colisionan para que la bola cambie de direccion de rebote segun el lugar donde impacte, ademas de sacar el metodo del update()
    sumarPuntos(ball, platform){
      contador++;
      console.log('contador: ', contador);
      //agregar el valor de contador a un elemento html
      document.getElementById('contador').innerHTML = contador;
      //aqui lo del calculo de donde pega con la plataforma
      let impactoRelativo = ball.x - platform.x;
      if (impactoRelativo < 0.1 && impactoRelativo > -0.1) {
        ball.setVelocityY(Phaser.Math.Between(-10, 10))
      }else{
        ball.setVelocityY(-1 * Math.abs(10 * impactoRelativo) )
      }
      console.log(impactoRelativo);
    }

    //4-Metodo que monitorea constantemente cualquier cambio en el juego
    update() {
      if (this.cursors.left.isDown) {
        console.log('izq');
        this.platform.setVelocityX(-500);
      }
      else if (this.cursors.right.isDown) {
        console.log('der');
        this.platform.setVelocityX(500);
      }else{
        this.platform.setVelocityX(0);
      }

      //11- Fin del juego
      if (this.ball.y > altoPantalla) {
        console.log('fin del juego');
        this.scene.pause();
        let fin = document.getElementById('end');
        fin.style.display = 'block';
      }
    }

    // 12 Metodo para sumar puntos
    // sumarPuntos(){
    //   contador++;
    //   console.log('contador: ', contador);
    //   //agregar el valor de contador a un elemento html
    //   document.getElementById('contador').innerHTML = contador;
    // }

    
}


//alfa: configuracion del juego e instanciacion del mismo.

const config = {
  type: Phaser.AUTO,
  width: anchoPantalla,
  height: altoPantalla,
  physics: {
      default: 'arcade',
      arcade: {
// 14 Quitar la gravedad
          gravity: { y: 200 }
      }
  },
  scene: Example
};

const game = new Phaser.Game(config);