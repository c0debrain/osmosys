import AbstractEditController from 'osmosys/controllers/abstract-edit-controller';
export default AbstractEditController.extend({
  hideCancelButton: true,
  updateCapability: 'update_config',

  afterUpdate() {
    this.displayAlert(this.get('i18n').t('admin.header.titles.optionsSaved'), this.get('i18n').t('admin.header.messages.headerSaved'));
  }
});
