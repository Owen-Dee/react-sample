import * as Constants from './constants';

interface IPrice {
    type: Constants.ADD_PRICE,
    payLoad: number
}

export function addPrice(price: number):IPrice {
    return {
        type: Constants.ADD_PRICE,
        payLoad: price
    }
}

export type CouponActions = IPrice;