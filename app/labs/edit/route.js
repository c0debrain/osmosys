import AbstractEditRoute from 'osmosys/routes/abstract-edit-route';
import AddToPatientRoute from 'osmosys/mixins/add-to-patient-route';
import ChargeRoute from 'osmosys/mixins/charge-route';
import Ember from 'ember';
import moment from 'moment';
import PatientListRoute from 'osmosys/mixins/patient-list-route';
import { translationMacro as t } from 'ember-i18n';

export default AbstractEditRoute.extend(AddToPatientRoute, ChargeRoute, PatientListRoute, {
  editTitle: t('labs.editTitle'),
  modelName: 'lab',
  newTitle: t('labs.newTitle'),
  pricingCategory: 'Lab',
  customForms: Ember.inject.service(),

  actions: {
    returnToAllItems() {
      this.controller.send('returnToAllItems');
    },

    allItems() {
      if (this.controller.get('isCompleted')) {
        this.transitionTo('labs.completed');
      } else {
        this.transitionTo('labs.index');
      }
    }
  },

  getNewData() {
    let newLabData = {
      selectPatient: true,
      requestDate: moment().startOf('day').toDate(),
      customForms: Ember.Object.create()
    };
    let customForms = this.get('customForms');
    return customForms.setDefaultCustomForms(['lab'], newLabData);
  }
});
