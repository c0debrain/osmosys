import AbstractIndexRoute from 'osmosys/routes/abstract-index-route';
import Ember from 'ember';
export default AbstractIndexRoute.extend({
  pageTitle: 'Incident Report',

  // No model for reports; data gets retrieved when report is run.
  model() {
    return Ember.RSVP.resolve(Ember.Object.create({}));
  }

});
