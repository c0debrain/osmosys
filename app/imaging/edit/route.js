import { translationMacro as t } from 'ember-i18n';
import AbstractEditRoute from 'osmosys/routes/abstract-edit-route';
import AddToPatientRoute from 'osmosys/mixins/add-to-patient-route';
import ChargeRoute from 'osmosys/mixins/charge-route';
import Ember from 'ember';
import moment from 'moment';
import PatientListRoute from 'osmosys/mixins/patient-list-route';
export default AbstractEditRoute.extend(AddToPatientRoute, ChargeRoute, PatientListRoute, {
  editTitle: t('imaging.titles.editTitle'),
  modelName: 'imaging',
  newTitle: t('imaging.titles.editTitle'),
  pricingCategory: 'Imaging',

  actions: {
    returnToAllItems() {
      this.controller.send('returnToAllItems');
    }
  },

  getNewData() {
    return Ember.RSVP.resolve({
      selectPatient: true,
      requestDate: moment().startOf('day').toDate()
    });
  }
});
