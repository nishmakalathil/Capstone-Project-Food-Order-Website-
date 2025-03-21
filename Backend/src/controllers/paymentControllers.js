

// controllers/paymentController.js

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN;


const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, totaldiscount, deliverycharges } = req.body;

    // Calculate the total price before discount
    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

    // Apply discount
    const discountedTotal = totalPrice - totaldiscount + deliverycharges;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product?.name,
          images: [product?.image],
        },
        unit_amount: Math.round(discountedTotal * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${client_domain}/user/payment-success`,
      cancel_url: `${client_domain}/user/payment-cancel`,
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
  }
};

//session status
const sessionStatus = async (req, res) => {

  try {
      const sessionId = req.query.session_id;
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      console.log("session=====", session);

      res.send({
          status: session?.status,
          customer_email: session?.customer_details?.email,
          session_data: session,
      });
  } catch (error) {
      res.status(error?.statusCode || 500).json(error.message || "internal server error");
  }
};




module.exports =  {createCheckoutSession,sessionStatus} ;
