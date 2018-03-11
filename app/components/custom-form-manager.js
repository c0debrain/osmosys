import Ember from 'ember';
import SelectValues from 'osmosys/utils/select-values';
import CustomFormManager from 'osmosys/mixins/custom-form-manager';

export default Ember.Component.extend(SelectValues, CustomFormManager, {
  model: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormsForType();
  },

  actions: {
    addForm() {
      let model = this.get('model');
      let formsForSelect = this.get('formsForSelect');
      this.sendAction('openModalAction', 'custom-form-add', Ember.Object.create({
        modelToAddTo: model,
        customForms: formsForSelect
      }));
    }
  }
});
