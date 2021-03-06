import { translationMacro as t } from 'ember-i18n';
import AbstractIndexRoute from 'osmosys/routes/abstract-index-route';
import Ember from 'ember';

const { computed } = Ember;

export default AbstractIndexRoute.extend({
  modelName: 'imaging',
  pageTitle: computed('i18n.locale', () => {
    return t('imaging.pageTitle');
  }),
  searchStatus: 'Requested',

  _getStartKeyFromItem(item) {
    let imagingDateAsTime = item.get('imagingDateAsTime');
    let id = this._getPouchIdFromItem(item);
    let requestedDateAsTime = item.get('requestedDateAsTime');
    let searchStatus = this.get('searchStatus');
    return [searchStatus, requestedDateAsTime, imagingDateAsTime, id];
  },
  _modelQueryParams() {
    let maxId = this._getMaxPouchId();
    let maxValue = this.get('maxValue');
    let minId = this._getMinPouchId();
    let searchStatus = this.get('searchStatus');
    return {
      options: {
        startkey: [searchStatus, null, null, minId],
        endkey: [searchStatus, maxValue, maxValue, maxId]
      },
      mapReduce: 'imaging_by_status'
    };
  }
});
