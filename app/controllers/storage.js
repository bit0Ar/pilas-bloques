import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  actions: {
    toggleWelcomeMessage() {
      var contador = this.set('settings.desafio');
      console.log('contador',contador);
    }
  }
});