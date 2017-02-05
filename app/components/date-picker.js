import Ember from 'ember';
import format from 'ember-moment/computeds/format';

export default Ember.Component.extend({
    hours: ["HH","01","02","03","04","05","06","07","08","09","10","11","12"],
    minutes: ["MM","00","15","30","45"],
    ampms: ["--","AM","PM"],
    time: Ember.computed('hour','min','ampm', function() {
      var time = this.get('hour') + ":" + this.get('minute');
      console.log(time);
      return time;
    }),
    init: function() {
      this._super(...arguments);
      console.log("INIT()");
      this.set('hour', format(this.get('value'), 'HH'));
      this.set('minute', format(this.get('value'), 'mm'));
      this.set('ampm', format(this.get('value'), 'A'));
    },
    didInsertElement: function() {
      this.$('input[type=text]').datepicker({
        showOn:'button'
      });
    },
    actions: {
      changeHour(value) {
        console.log("changeHour()");
        this.set('hour', value);
        var hour = value % 12 + (this.get('ampm') === 'PM' ? 12 : 0);
        this.set('value', new Date(this.get('value').setHours(hour)));
      },
      changeMinute(value) {
        console.log("changeMinute()");
        this.set('minute', value);
        this.set('value', new Date(this.get('value').setMinutes(value)));
      },
      changeAmpm(value) {
        console.log("changeAmpm()");
        this.set('ampm', value);
        var hour = this.get('hour') % 12 + (value === 'PM' ? 12 : 0);
        this.set('value', new Date(this.get('value').setHours(hour)));
      }
    }

});
