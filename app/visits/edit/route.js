import { translationMacro as t } from 'ember-i18n';
import AbstractEditRoute from 'osmosys/routes/abstract-edit-route';
import ChargeRoute from 'osmosys/mixins/charge-route';
import Ember from 'ember';
import PatientListRoute from 'osmosys/mixins/patient-list-route';
import PatientVisit from 'osmosys/mixins/patient-visits';
import DS from 'ember-data';

const {
  get,
  set,
  isEmpty
} = Ember;

export default AbstractEditRoute.extend(ChargeRoute, PatientListRoute, PatientVisit, {
  customForms: Ember.inject.service(),
  editTitle: t('visits.titles.editVisit'),
  modelName: 'visit',
  newTitle: t('visits.titles.newVisit'),
  pricingCategory: 'Ward',
  photos: null,

  model(params) {
    let idParam = get(this, 'idParam');
    if (!isEmpty(idParam) && params[idParam] === 'checkin') {
      return this.getNewData().then((newData) => {
        newData.checkIn = true;
        let newVisit = get(this, 'store').createRecord('visit', newData);
        return newVisit;
      });
    } else {
      return this._super(params);
    }
  },

  getNewData() {
    let newVisitData = {
      startDate: new Date(),
      visitType: 'Admission',
      customForms: Ember.Object.create()
    };
    let customForms = this.get('customForms');
    return customForms.setDefaultCustomForms(['visit'], newVisitData);
  },

  getScreenTitle(model) {
    if (model.get('checkIn')) {
      return this.get('i18n').t('visits.titles.patientCheckIn');
    } else {
      return this._super(model);
    }
  },

  setupController(controller, model) {
    let promise = this.store.query('report', {
      options: {
        key: get(model, 'id')
      },
      mapReduce: 'report_by_visit'
    }).then((reports) => {
      set(controller, 'noReport', isEmpty(reports));
      return isEmpty(reports) ? '' : get(reports, 'firstObject');
    });
    set(controller, 'report', DS.PromiseObject.create({ promise }));
    this._super(controller, model);
    this.store.query('photo', {
      options: {
        key: get(model, 'id')
      },
      mapReduce: 'photo_by_visit'
    }).then(function(photos) {
      let visitPhotos = [];
      visitPhotos.addObjects(photos);
      model.set('photos', visitPhotos);
    });
  },

  actions: {
    updateNote() {
      this.controller.send('update', true);
    },
    deletePatientNote(model) {
      this.controller.send('deletePatientNote', model);
    },
    deletePhoto(model) {
      this.controller.send('deletePhoto', model);
    }
  }
});
