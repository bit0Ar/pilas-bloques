import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('grupo');
    console.log('store', this.store)
  }
});
