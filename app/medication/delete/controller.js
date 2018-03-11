import { translationMacro as t } from 'ember-i18n';
import AbstractDeleteController from 'osmosys/controllers/abstract-delete-controller';
import PatientSubmodule from 'osmosys/mixins/patient-submodule';
export default AbstractDeleteController.extend(PatientSubmodule, {
  title: t('labels.delete_request'),

  actions: {
    delete() {
      this.deleteChildFromVisit('medication');
    }
  }
});
