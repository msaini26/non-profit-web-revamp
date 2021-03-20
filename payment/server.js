const stripe = require('stripe')('sk_test_51IXAcIE2MMOUDocrQSxEfURlxG8q4wmXf9K1TuhhybfGQgCPlqYVhwOlj0U790biz3CuiMXWu7NT6vEETGg9qH9B00JbayZc4N');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'https://deishacks.itzsims.repl.co/payment';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // update domain
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));