import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwtKey = process.env.HSG_JWT_KEY;

const handler = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const checkoutID = event.data.object.id;
    const session = await stripe.checkout.sessions.retrieve(checkoutID, {
      expand: ["line_items"],
    });

    const productID = session.line_items.data[0].price.product;
    const { email, name } = session.customer_details;
    const subjectName = name || email;
    console.log(`💰 Payment received from ${email}!`);
 
    if (productID === productIDs.preorder) {
      await sendEmail(EMAIL_TEMPLATE_IDS.PRE_ORDER, email, {
        name: subjectName,
      });
    } else {
      const paymentID = session.payment_intent;
      const token = jwt.sign({ email, name, id: paymentID }, jwtKey, {
        expiresIn: "1d",
      });
      const downloadLink = `https://hackathonsurvivalguide.com/purchase/${token}`;
      await sendEmail(EMAIL_TEMPLATE_IDS.BOOK_PURCHASE, email, {
        name: subjectName,
        downloadLink,
      });
    }
    return res.status(200).send();
  } else {
    return res.status(200).send({ received: true });
  }
};

export default handler;