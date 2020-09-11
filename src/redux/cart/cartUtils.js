export const addItemToCart = (cartItems, newItem) => {
  const existingCartItem = cartItems.find(el => el.id === newItem.id);
  if (existingCartItem) {
    return cartItems.map(el => el.id === newItem.id ? {
      ...el,
      quantity: el.quantity + 1
    } : el);
  }

  return [...cartItems, {
    ...newItem,
    quantity: 1
  }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(el => el.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(el => el.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? {
    ...cartItemToRemove,
    quantity: cartItem.quantity - 1
  } : cartItem)

}