import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  layout: true,
  queryParams: ['layout'],
  notificador: Ember.inject.service(),
  settings: storageFor('settings'),
  actions: {
   getContador() {
      var contador = this.set('settings.desafio');
      console.log('contadorApp',contador);
    }
  }
});
