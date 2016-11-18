import Ember from 'ember';

export default Ember.Controller.extend({
  pilas: Ember.inject.service(),
  queryParams: ['codigo', 'debug', 'panelCanvasVisible', 'panelBlocklyVisible', 'panelCodigoVisible'],
  codigo: null,
  debug: true,
  codigoJavascript: '',
  actions: {
    toggleBody() {
        console.log("Look at me go!");
        this.toggleProperty('isBody');
    }
  }
});
