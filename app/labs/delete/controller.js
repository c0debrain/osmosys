import AbstractDeleteController from 'osmosys/controllers/abstract-delete-controller';
import PatientSubmodule from 'osmosys/mixins/patient-submodule';
import { translationMacro as t } from 'ember-i18n';

export default AbstractDeleteController.extend(PatientSubmodule, {
  title: t('labs.deleteTitle'),

  actions: {
    delete() {
      this.deleteChildFromVisit('labs');
    }
  }
});
