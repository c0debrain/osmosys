import Ember from 'ember';
import PikadayComponent from 'osmosys/mixins/pikaday-component';

const {
  Component
} = Ember;

export default Component.extend(PikadayComponent, {
  classNames: ['input-group'],
  dateSetAction: 'filter',

  actions: {
    clearFilter() {
      let $input = this.$('input');
      $input.val('');
      this.sendAction('dateSetAction');
    }
  }
});
