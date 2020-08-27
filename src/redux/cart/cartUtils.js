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