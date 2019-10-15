import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Subtotal:</strong> ${cartAmount}
      <StripeCheckout
        name="Racing Rabbit"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : "" }
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_CDHFOoSp79lNHuKvUqYXD3pJ006bbkLu2d"
        token={handleCheckout}
        triggerEvent="onClick"
      >
      <Button
        icon="cart"
        color="teal"
        floated="right"
        content="Checkout"
        disabled={isCartEmpty || success}
      />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;
