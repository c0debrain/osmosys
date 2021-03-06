import AppointmentIndexRoute from 'osmosys/appointments/index/route';
import moment from 'moment';
import { translationMacro as t } from 'ember-i18n';
import Ember from 'ember';

const { computed } = Ember;

export default AppointmentIndexRoute.extend({
  editReturn: 'appointments.today',
  modelName: 'appointment',
  pageTitle: computed('i18n.locale', () => {
    return t('appointments.todayTitle');
  }),

  _modelQueryParams() {
    let endOfDay = moment().endOf('day').toDate().getTime();
    let maxValue = this.get('maxValue');
    let startOfDay = moment().startOf('day').toDate().getTime();
    return {
      options: {
        startkey: [startOfDay, null, 'appointment_'],
        endkey: [endOfDay, endOfDay, `appointment_${maxValue}`]
      },
      mapReduce: 'appointments_by_date'
    };
  }
});
