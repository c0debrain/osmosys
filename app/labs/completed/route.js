import LabsIndexRoute from 'osmosys/labs/index/route';
import { translationMacro as t } from 'ember-i18n';

export default LabsIndexRoute.extend({
  pageTitle: t('labs.completedTitle'),
  searchStatus: 'Completed'
});
