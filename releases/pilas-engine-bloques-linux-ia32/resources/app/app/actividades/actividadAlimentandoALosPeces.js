import bloques from 'pilas-engine-bloques/actividades/bloques';
import direcciones from 'pilas-engine-bloques/actividades/direccionesCuadricula';
var {Repetir, Procedimiento, AccionBuilder} = bloques;
var {IrDerecha,IrIzquierda,IrAbajo,IrArriba} = direcciones;

var AlimentarPez = AccionBuilder.build({
  descripcion: 'Alimentar pez',
  id: 'AlimentarPez',
  icono: 'icono.pez.png',
  comportamiento: 'RecogerPorEtiqueta',
  argumentos: '{etiqueta: "PezAnimado", idTransicion: "alimentarPez"}',
});

var AgarrarComida = AccionBuilder.build({
  descripcion: 'Agarrar comida',
  id: 'AgarrarComida',
  icono: 'icono.alimento_pez.png',
  comportamiento: 'RecogerPorEtiqueta',
  argumentos: '{etiqueta: "AlimentoAnimado", idTransicion: "recogerComida"}',
});

var actividadAlimentandoALosPeces = {
  nombre: 'Alimentando a los peces',
  id: 'AlimentandoALosPeces',
  enunciado:'Nuestro buzo debe alimentar con lombrices a los 7 peces que hay en esta escena. Buscá primero a las lombrices y luego pasá por cada pez alimentándolo. Pista: pensá en una estrategia de 3 partes.',

  // la escena proviene de ejerciciosPilas
  // DEPRECATED: escena: AlimentandoALosPeces,
  puedeComentar: false,
  puedeDesactivar: false,
  puedeDuplicar: false,

  bloques: [Procedimiento,Repetir,IrDerecha,IrIzquierda,IrAbajo,IrArriba,AlimentarPez,AgarrarComida],
};

export default actividadAlimentandoALosPeces;
