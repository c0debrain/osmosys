import AbstractPagedController from 'osmosys/controllers/abstract-paged-controller';
import UserSession from 'osmosys/mixins/user-session';
export default AbstractPagedController.extend(UserSession, {
  startKey: [],
  addPermission: 'add_imaging'
});
