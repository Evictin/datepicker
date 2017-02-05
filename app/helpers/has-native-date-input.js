import Ember from 'ember';

export function hasNativeDateInput() {
  var input = document.createElement("input");
  input.setAttribute('type', 'datetime-local');
  var notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);
  return (input.value !== notADateValue);
//  return typeof window.orientation !== undefined;
}

export default Ember.Helper.helper(hasNativeDateInput);
