import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.uncountable('me');

// Meet Ember Inspector's expectation of an export
export default {};
