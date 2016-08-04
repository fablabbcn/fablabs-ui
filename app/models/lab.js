import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    type:               attr('string'),
    name:               attr('string'),
    slug:               attr('string'),
    description:        attr('string'),
    contacts:           attr(),
    location:           attr(),
    kind:               attr('string'),
    avatar:             attr('string'),
    header:             attr('string'),
    users:              attr(),
    projects:           attr(),
    capabilities:       attr(),
    machines:           attr(),

    projects_count: Ember.computed('projects', function() {
      return `${this.get('projects').length}`;
    }),

    users_count: Ember.computed('users', function() {
      return `${this.get('users').length}`;
    }),

    machines_count: Ember.computed('machines', function() {
      return `${this.get('machines').length}`;
    }),

    lab_capabilities: Ember.computed('capabilities', function() {
      return `${this.get('capabilities').map(function(x){ return x.replace(/_/g, ' '); } )}`.split(","); 
    }),

    lab_kind: Ember.computed('kind', function() {
      return `${this.get('kind').replace('_', '')}`;
    }),
});
