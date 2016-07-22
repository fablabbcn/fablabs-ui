import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    username:           attr('string'),
    first_name:         attr('string'),
    last_name:          attr('string'),
    email:              attr('string'),
    avatar_src:         attr('string'),
    fab10_coupon_code:  attr('string')
});
