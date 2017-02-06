import Ember from 'ember';
import format from 'ember-moment/computeds/format';

export default Ember.Component.extend({
    hours: ["HH","01","02","03","04","05","06","07","08","09","10","11","12"],
    minutes: ["MM","00","15","30","45"],
    ampms: ["--","AM","PM"],
    partOfDateChanged: Ember.observer('hour','minute','ampm', 'date', function() {
      Ember.run.once(this, 'calculateNewDate');
    }),
    calculateNewDate: function() {
      var minute = this.get('minute');
      var ampm = this.get('ampm');
      var hour = this.get('hour') % 12 + (ampm === 'PM' ? 12 : 0);
      var oldVal = this.get('date');
      var year = oldVal.getFullYear();
      var month = oldVal.getMonth();
      var date = oldVal.getDate();
      this.set('value', new Date(year, month, date, hour, minute, 0, 0));
    },
    init: function() {
      this._super(...arguments);
      this.set('hour', format(this.get('value'), 'HH'));
      this.set('minute', format(this.get('value'), 'mm'));
      this.set('ampm', format(this.get('value'), 'A'));
    },
    didInsertElement: function() {
      var _this = this;
      this.$('input[type=text]').datepicker({
        showOn:'button',
        showButtonPanel:true,
        onSelect: function(dateText) {
        },
        onClose: function(dateText) {
          var date = new Date(dateText);
          _this.set('date', date);
        }
      });
      // the following code prevents the datepicker from closing when you click on a date
      $.datepicker._selectDateOverload = $.datepicker._selectDate;
      $.datepicker._selectDate = function(id, dateStr) {
          var target = $(id);
          var inst = this._getInst(target[0]);
          inst.inline = true;
          $.datepicker._selectDateOverload(id, dateStr);
          inst.inline = false;
          this._updateDatepicker(inst);
      }
    },
    actions: {
      changeHour(value) {
        this.set('hour', value);
      },
      changeMinute(value) {
        this.set('minute', value);
      },
      changeAmpm(value) {
        this.set('ampm', value);
      }
    }

});
