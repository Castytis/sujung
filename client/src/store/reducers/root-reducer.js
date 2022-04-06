import { combineReducers } from 'redux';
import authenticateTeacher from './auth-teacher-reducer';
import authenticateParent from './auth-parent-reducer';
import teachers from './teacher-reducer';
import parents from './parent-reducer';
import meetings from './meeting-reducer';

export default combineReducers({
  authenticateTeacher,
  authenticateParent,
  teachers,
  parents,
  meetings,
});
