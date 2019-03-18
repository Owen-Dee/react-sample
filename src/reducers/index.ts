import { combineReducers } from 'redux';
import Coupon from './modules/coupon';

export default combineReducers({
  coupon: Coupon
});
