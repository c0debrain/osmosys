import AbstractIndexRoute from 'osmosys/routes/abstract-index-route';
import UserSession from 'osmosys/mixins/user-session';
import { translationMacro as t } from 'ember-i18n';
import Ember from 'ember';
const {
  inject
} = Ember;
export default AbstractIndexRoute.extend(UserSession, {
  config: inject.service(),
  newButtonAction: function() {
    if (this.currentUserCan('add_user')) {
      return 'newItem';
    } else {
      return null;
    }
  }.property(),
  newButtonText: t('user.plusNewUser'),
  pageTitle: t('user.usersPageTile'),
  model() {
    return this.store.findAll('user');
  }
});
