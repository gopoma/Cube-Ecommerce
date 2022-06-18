const { stripeSecretKey } = require("../config");
const stripe = require("stripe")(stripeSecretKey);

class PaymentsService {
  // Payment Session
  async createIntent(amount) {
    const intent = await stripe.paymentIntents.create({
      amount, // price
      currency: "usd" // "mxn", "cop", "ars", "eur"
    });

    return intent.client_secret;
  }
}

module.exports = PaymentsService;