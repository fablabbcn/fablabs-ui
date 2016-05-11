import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  job_title:  attr(),
  lab_id:     attr(),
});
