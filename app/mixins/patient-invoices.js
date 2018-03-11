import Ember from 'ember';
import PouchDbMixin from 'osmosys/mixins/pouchdb';

export default Ember.Mixin.create(PouchDbMixin, {
  getPatientInvoices(patient) {
    let patientId = patient.get('id');
    return this.store.query('invoice', {
      options: {
        key: patientId
      },
      mapReduce: 'invoice_by_patient'
    });
  }
});
