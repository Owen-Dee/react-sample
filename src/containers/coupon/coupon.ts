import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import  { Coupon } from '../../components';
import { addPrice } from '../../actions/coupon';
import { IGlobalState } from '../../types';

export function mapStateToProps(state: IGlobalState) {
    return {
        price: state.coupon.price
    }
}


export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        addPrice: (price: number) => dispatch(addPrice(price))
    }
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Coupon);