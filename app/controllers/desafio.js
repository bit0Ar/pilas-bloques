import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
export default Ember.Controller.extend({
  pilas: Ember.inject.service(),
  queryParams: ['codigo', 'debug', 'panelCanvasVisible', 'panelBlocklyVisible', 'panelCodigoVisible'],
  codigo: null,
  debug: false,
  panelCanvasVisible: true,
  panelBlocklyVisible: true,
  panelCodigoVisible: false,
  codigoJavascript: '',
 settings: storageFor('settings'),

actions: {
  cuandoCargaPilas(){
    console.log('guardar id',this);
    var contador = this.set('settings.desafio',990);
      console.log('contador',contador);

  },
  getContador() {
      var contador = this.get('settings.desafio');
      console.log('contador',contador);
    }
  }
});
