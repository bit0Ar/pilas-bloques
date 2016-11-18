import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  titulo: attr('string'),
  // desafios: hasMany('desafio') // , {inverseOf: 'grupo'})
});
