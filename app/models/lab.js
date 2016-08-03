import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    type:               attr('string'),
    name:               attr('string'),
    slug:               attr('string'),
    description:        attr('string'),
    email:              attr('string'),
    kind:              attr('string'),
    lab_kind: Ember.computed('kind', function() {
      return `${this.get('kind').replace('_', '')}`;
    }),
});
