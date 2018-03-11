import AbstractDeleteController from 'osmosys/controllers/abstract-delete-controller';
import PatientSubmodule from 'osmosys/mixins/patient-submodule';
export default AbstractDeleteController.extend(PatientSubmodule, {
  title: 'Delete Request',

  actions: {
    delete() {
      this.deleteChildFromVisit('imaging');
    }
  }
});
