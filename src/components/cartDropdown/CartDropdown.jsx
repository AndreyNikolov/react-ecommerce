import React from 'react';

import CustomButton from '../customButton/CustomButton';

import './CartDropwdown.scss';

const CartDropwdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

export default CartDropwdown;
