import Ember from 'ember';
import PagingActions from 'osmosys/mixins/paging-actions';
export default Ember.Component.extend(PagingActions, {
  classNames: ['panel', 'panel-primary']
});
