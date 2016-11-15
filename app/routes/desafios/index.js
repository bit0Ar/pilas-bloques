import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('desafio');
    console.log('lklklklklkl', this.store)
  }
});
