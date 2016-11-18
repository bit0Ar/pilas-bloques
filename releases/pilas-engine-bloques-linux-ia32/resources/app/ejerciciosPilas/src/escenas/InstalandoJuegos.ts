/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
/// <reference path = "../actores/InstaladorAnimado.ts" />
/// <reference path = "../comportamientos/ComportamientoAnimado.ts" />
/// <reference path = "../comportamientos/ComportamientoColision.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />

class InstalandoJuegos extends EscenaActividad {
  compus;
  automata;
  fondo;
  cuadricula;
  estado;

  iniciar() {
      this.fondo = new Fondo('fondos.biblioteca.png',0,0);
      this.cuadricula = new Cuadricula(20, -50, 1, 4,
          { alto: 100, ancho: 400 },
          { grilla: 'invisible.png', cantColumnas: 1 });
      for(var i=1;i<=3;++i){
        this.cuadricula.agregarActor(new CompuAnimada(0,0),0,i);
        }
      this.colocarAutomata();
      this.construirFSM();
   }


  private construirFSM(){
    var builder= new BuilderStatePattern('inicial');
    builder.agregarEstadosPrefijados('prendido',1,3);
    builder.agregarEstadosPrefijados('escritoA',1,3);
    builder.agregarEstadosPrefijados('escritoB',1,3);
    builder.agregarEstadosPrefijados('escritoC',1,3);
    builder.agregarEstadosPrefijados('juegoInstalado',1,3);
    builder.agregarEstadosPrefijados('maquinaApagada',1,3);
    builder.agregarEstadoAceptacion('todoInstalado');
    builder.agregarTransicionesIteradas('prendido','escritoA','escribirA',1,3,1,3);
    builder.agregarTransicionesIteradas('escritoA','escritoB','escribirB',1,3,1,3);
    builder.agregarTransicionesIteradas('escritoB','escritoC','escribirC',1,3,1,3);
    builder.agregarTransicionesIteradas('escritoC','juegoInstalado','instalar',1,3,1,3);
    builder.agregarTransicionesIteradas('juegoInstalado','maquinaApagada','apagar',1,2,1,2);
    builder.agregarTransicion('juegoInstalado3', 'todoInstalado', 'apagar');
    builder.agregarTransicion('inicial','prendido1','prender');
    builder.agregarTransicion('maquinaApagada1','prendido2','prender');
    builder.agregarTransicion('maquinaApagada2','prendido3','prender');
    builder.agregarError('inicial','instalar','Primero hay que prender la computadora');
    builder.agregarError('inicial','escribirA','Primero hay que prender la computadora');
    builder.agregarError('inicial','escribirB','Primero hay que prender la computadora');
    builder.agregarError('inicial','escribirC','Primero hay que prender la computadora');
    builder.agregarError('inicial','apagar','Primero hay que prender la computadora');
    builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada','instalar','Primero hay que prender la computadora',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada','escribirC','Primero hay que prender la computadora',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada','escribirA','Primero hay que prender la computadora',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada','escribirB','Primero hay que prender la computadora',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada','apagar','Primero hay que prender la computadora',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('prendido','escribirC','Esa no es la clave correcta',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('prendido','escribirB','Esa no es la clave correcta',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('escritoA','escribirC','Esa no es la clave correcta',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('escritoA','escribirA','Esa no es la clave correcta',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('escritoB','escribirB','Esa no es la clave correcta',1,3);
    builder.agregarErrorAVariosEstadosDeSalida('escritoB','escribirA','Esa no es la clave correcta',1,3);


    this.estado=builder.estadoInicial();
  }

   private colocarAutomata(){
     this.automata = new InstaladorAnimado(0,0);
     this.cuadricula.agregarActor(this.automata,0,0);
     this.automata.escala=1;
     this.automata.y=-70;
     this.automata.x=-170;
   }
}


class PrenderCompuParaInstalar extends DesencadenarAnimacionSiColisiona {
  configurarVerificaciones(){
    super.configurarVerificaciones();
    this.verificacionesPre.push(new Verificacion(() => !this.objetoTocado().yaFuePrendida,
      "Esta compu ya la prendiste antes"))
  }
}




class ApagarPorEtiqueta extends ComportamientoColision {
    metodo(objetoColision){
        objetoColision.hacer_luego(ComportamientoAnimado, {nombreAnimacion: "apagada", mantenerAnimacion: true});
    }
}

class InstalarPorEtiqueta extends ComportamientoColision {
    metodo(objetoColision){
        objetoColision.hacer_luego(ComportamientoAnimado, { nombreAnimacion: "instalado", mantenerAnimacion: true });
    }
}

class PrenderPorEtiqueta extends ComportamientoColision {
    metodo(objetoColision){
        objetoColision.hacer_luego(ComportamientoAnimado, { nombreAnimacion: "prendida", mantenerAnimacion: true });
    }
}

class EscribirEnCompuAnimada extends ComportamientoColision {
    metodo(objetoColision){
      if (this.argumentos['idTransicion'] == 'escribirC') {
          objetoColision.hacer_luego(ComportamientoAnimado, { nombreAnimacion: "claveok", mantenerAnimacion: true });
      }
    }
}
