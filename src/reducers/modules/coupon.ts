import { CouponActions } from '../../actions/coupon';
import * as Constants from '../../actions/constants';
import { ICouponState } from '../../types';

const INITIAL_STATE: ICouponState = {
    price: 30
}

export default function operateCouponType(state: ICouponState = INITIAL_STATE, action: CouponActions): ICouponState {
    switch(action.type) {
        case Constants.ADD_PRICE:
            return {
                ...state,
                price: action.payLoad
            }
        default:
            break;
    }

    return state
}