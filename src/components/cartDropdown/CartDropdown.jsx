import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../customButton/CustomButton';
import CartItem from '../cartItem/CartItem';
import { selectCartItems } from '../../redux/cart/cartSelectors';

import './CartDropwdown.scss';

const CartDropwdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropwdown);
