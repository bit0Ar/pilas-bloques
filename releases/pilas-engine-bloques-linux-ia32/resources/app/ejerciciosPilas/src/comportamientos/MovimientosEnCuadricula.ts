/// <reference path = "../../dependencias/pilasweb.d.ts"/>
/// <reference path = "MovimientoAnimado.ts"/>
/// <reference path = "../escenas/Errores.ts" />


class MovimientoEnCuadricula extends MovimientoAnimado {
    cuadricula;
    estoyEmpezandoAMoverme;
    direccionCasilla; // Strategy

    preAnimacion(){
        this.cuadricula = this.receptor.cuadricula;
        this.direccionCasilla = this.direccionCasilla || new this.argumentos.claseDirCasilla();
        this.argumentos.direccion = new Direct(this.vectorDireccion().x,this.vectorDireccion().y);
        this.argumentos.distancia = this.distancia();
        super.preAnimacion();
        this.estoyEmpezandoAMoverme = true;
    }

    doActualizar(){
        if (!this.puedoMovermeEnEsaDireccion() || super.doActualizar()){
            return true;
        }
    }

    puedoMovermeEnEsaDireccion(){
        if (this.estoyEmpezandoAMoverme){
            this.estoyEmpezandoAMoverme = false;
            return this.verificarDireccion(this.receptor.casillaActual());
        }
        return true;
    }

    distancia(){
        // Template Method. Devuelve la distancia vertical ú horizontal según corresponda
        return this.direccionCasilla.distancia(this);
    }

    distanciaHorizontal(){
        return this.cuadricula.anchoCasilla() + this.cuadricula.separacion();
    }
    distanciaVertical(){
        return this.cuadricula.altoCasilla() + this.cuadricula.separacion();
    }
    verificarDireccion(casilla){
        var proximaCasilla = this.proximaCasilla(casilla);
        if (!proximaCasilla){
            throw new ActividadError("No puedo ir para " + this.textoAMostrar());
            return false;
        };
        this.receptor.setCasillaActual(proximaCasilla);
        return true
    }

    proximaCasilla(casilla){
        // Template Method. Devolver la casilla a la que se va a avanzar
        return this.direccionCasilla.proximaCasilla(casilla);
    }

    textoAMostrar(){
        // Template Method. Para mostrar mensaje descriptivo al no poder avanzar
        return this.direccionCasilla.textoAMostrar();
    }

    vectorDireccion(){
        return this.direccionCasilla.vectorDireccion;
    }
}

class DirCasillaDerecha  {
    vectorDireccion = { x: 1, y: 0 };

    proximaCasilla(casilla){
        return casilla.casillaASuDerecha();
    }
    textoAMostrar(){
        return "la derecha";
    }
    distancia(movimiento){
        return movimiento.distanciaHorizontal();
    }
}

class DirCasillaArriba {
    vectorDireccion = { x: 0, y: 1 };

    proximaCasilla(casilla){
        return casilla.casillaDeArriba();
    }
    textoAMostrar(){
        return "arriba";
    }
    distancia(movimiento){
        return movimiento.distanciaVertical();
    }
}

class DirCasillaAbajo {
    vectorDireccion = { x: 0, y: -1 };

    proximaCasilla(casilla){
        return casilla.casillaDeAbajo();
    }
    textoAMostrar(){
        return "abajo";
    }
    distancia(movimiento){
        return movimiento.distanciaVertical();
    }
}

class DirCasillaIzquierda {
    vectorDireccion = { x: -1, y: 0 };

    proximaCasilla(casilla){
        return casilla.casillaASuIzquierda();
    }
    textoAMostrar(){
        return "la izquierda";
    }
    distancia(movimiento){
        return movimiento.distanciaHorizontal();
    }
}

class MoverACasillaDerecha extends MovimientoEnCuadricula {
  direccionCasilla = new DirCasillaDerecha();
}
class MoverACasillaArriba extends MovimientoEnCuadricula {
  direccionCasilla = new DirCasillaArriba();
}
class MoverACasillaAbajo extends MovimientoEnCuadricula {
  direccionCasilla = new DirCasillaAbajo();
}
class MoverACasillaIzquierda extends MovimientoEnCuadricula {
  direccionCasilla = new DirCasillaIzquierda();
}

class MoverTodoAIzquierda extends MoverACasillaIzquierda{
   proximaCasilla(casilla){
        return this.cuadricula.casilla(this.receptor.casillaActual().nroFila,0);
   }
   distancia(){
        return this.distanciaHorizontal()
               * this.receptor.casillaActual().nroColumna;
   }
}

class MoverTodoADerecha extends MoverACasillaDerecha{
   proximaCasilla(casilla){
        return this.cuadricula.casilla(this.receptor.casillaActual().nroFila,this.cuadricula.cantColumnas-1);
   }
   distancia(){
        return this.distanciaHorizontal()
               * (this.cuadricula.cantColumnas - 1 - this.receptor.casillaActual().nroColumna );
   }
}

class MoverTodoArriba extends MoverACasillaArriba{
   proximaCasilla(casilla){
        return this.cuadricula.casilla(this.receptor.casillaActual().nroColumna,0);
   }
   distancia(){
        return this.distanciaVertical()
               * this.receptor.casillaActual().nroFila;
   }
}

class MoverTodoAbajo extends MoverACasillaAbajo{
   proximaCasilla(casilla){
        return this.cuadricula.casilla(this.receptor.casillaActual().nroColumna,this.cuadricula.cantFilas-1);
   }
   distancia(){
        return this.distanciaVertical()
               * (this.cuadricula.cantFilas - 1 - this.receptor.casillaActual().nroColumna);
   }
}

class SiguienteFila extends MoverACasillaAbajo {
  configurarVerificaciones() {
    super.configurarVerificaciones();
    this.verificacionesPre.push(new Verificacion(() => this.receptor.casillaActual().esInicio(), "No puedo ir desde acá, tengo que estar al inicio de la fila"));
  }
}

class SiguienteColumna extends MoverACasillaDerecha {
  configurarVerificaciones() {
    super.configurarVerificaciones();
    this.verificacionesPre.push(new Verificacion(() => this.receptor.casillaActual().esInicio(), "No puedo ir desde acá, tengo que estar al inicio de la columna"));
  }
}
