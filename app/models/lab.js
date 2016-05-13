import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    type:               attr('string'),
    name:               attr('string'),
    slug:               attr('string'),
    description:        attr('string'),
    email:              attr('string'),
});
