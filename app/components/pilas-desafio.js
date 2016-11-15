import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['desafio'],
  nombre: 'caca',
  deshabilitada: false,

  actions: {
    abrir() {
      this.sendAction('onSelect', this.get('nombre'));
    }
  }
});
