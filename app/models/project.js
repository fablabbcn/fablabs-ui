import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    type:               attr('string'),
    title:              attr('string'),
    description:        attr('string'),
    faq:                attr('string'),
    github:             attr('string'),
    web:                attr('string'),
    dropbox:            attr('string'),
    bitbucket:          attr('string'),
    created_at:         attr('string'),
    updated_at:         attr('string'),
    vimeo:              attr('string'),
    flickr:             attr('string'),
    youtube:            attr('string'),
    drive:              attr('string'),
    twitter:            attr('string'),
    facebook:           attr('string'),
    googleplus:         attr('string'),
    instagram:          attr('string'),
    status:             attr('string'),
    version:            attr('string'),
    scope:              attr('string'),
    community:          attr('string'),
    lookingfor:         attr('string'),
    cover:              attr('string'),
    documents:          attr(),
    owner:              attr()

});
