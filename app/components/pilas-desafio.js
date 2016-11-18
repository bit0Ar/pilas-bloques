import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  classNames: ['desafio'],
  nombre: 'null',
  deshabilitada: true,

  actions: {
    abrir() {
      this.sendAction('onSelect', this.get('nombre'));
      console.log('abrido');
    }
  
  }
});
