import Ember from 'ember';

export default Ember.Route.extend({
    model() {
      return {
        "date-of-loss": new Date()
      };
    }
});
