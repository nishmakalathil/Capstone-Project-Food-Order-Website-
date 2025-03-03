

// controllers/paymentController.js

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN;


const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;

    console.log(products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product?.name,
          images: [product?.image],
        },
        unit_amount: Math.round(product?.price * 100),
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

    // const newOrder = new Order({ userId, sessionId: session.id });
    // await newOrder.save();

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
  }
};


module.exports =  createCheckoutSession ;
