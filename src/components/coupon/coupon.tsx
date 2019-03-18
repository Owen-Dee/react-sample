'use strict';

import React, { Component } from 'react';
import {  Button } from 'antd';

import './coupon.scss';

interface ICouponProps {
    price: number;
    addPrice: (price: number) => void;
}

export default class Coupon extends Component<ICouponProps> {
    constructor(props: ICouponProps) {
        super(props);
    }

    handleClick = () => {
        const { price, addPrice } = this.props;
        addPrice(price + 30);
    }

    render() {
        const { price } = this.props;
        return (
            <div>
                <p>Coupon: {price}</p>
                <Button onClick={this.handleClick}>Click me</Button>
            </div>
        );
    }
}
