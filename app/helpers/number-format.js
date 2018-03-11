import Ember from 'ember';
import NumberFormat from 'osmosys/mixins/number-format';

let NumberHandler = Ember.Object.extend(NumberFormat);
export default Ember.Helper.helper(function([number]) {
  let numberHandler = new NumberHandler();
  return numberHandler._numberFormat(number);
});
