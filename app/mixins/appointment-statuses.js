import Ember from 'ember';
import SelectValues from 'osmosys/utils/select-values';
export default Ember.Mixin.create({
  appointmentStatusList: [
    'Attended',
    'Scheduled',
    'Canceled',
    'Missed'
  ],
  appointmentStatuses: Ember.computed.map('appointmentStatusList', SelectValues.selectValuesMap),

  appointmentStatusesWithEmpty: function() {
    return SelectValues.selectValues(this.get('appointmentStatusList'), true);
  }.property()
});
