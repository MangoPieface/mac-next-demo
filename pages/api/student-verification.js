import { isAcademic } from "swot-node";
import {
  generateStripeCheckoutSession,
  reqToProductID,
} from "./checkout_sessions";
import { EMAIL_TEMPLATE_IDS, sendEmail } from "./stripe_webhook";
const { Client } = require("@notionhq/client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var md5 = require("md5");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const emailToDiscountCode = (email) => {
  const emailHash = email.split("@")[0];
  const code = md5(email);
  return (
    emailHash.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6) +
    "-" +
    code.slice(0, 4)
  ).toUpperCase();
};

const addCustomDiscountCodeToStripe = async (code, percentage) => {
  const discount = await stripe.coupons.create({
    duration: "once",
    id: code,
    percent_off: percentage,
    metadata: {
      type: "ACADEMIA",
    },
  });
  return discount;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (req.method === `POST`) {
    const { email, name } = req.body;
    const isAcademicEmail = await isAcademic(email);
    if (isAcademicEmail) {
      try {
        const discountCode = emailToDiscountCode(email);
        try {
           await addCustomDiscountCodeToStripe(
            discountCode,
            15
          );
          const result = await notion.pages.create({
            parent: {
              database_id: "e41c8ae5113540dc8b973aaf321425ee",
            },
            properties: {
              Name: {
                type: "title",
                title: [
                  {
                    type: "text",
                    text: {
                      content: name,
                    },
                  },
                ],
              },
              Email: {
                type: "email",
                email: email,
              },
              Code: {
                type: "rich_text",
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: discountCode,
                    },
                  },
                ],
              },
            },
          });
        } catch (e) {
          if (e.message.includes("exists")) {
            console.log("Discount code already exists");
          }
        }
        const { url: checkoutLink } = await generateStripeCheckoutSession(
          undefined,
          discountCode,
          reqToProductID(req)
        );
        await sendEmail(EMAIL_TEMPLATE_IDS.STUDENT_DISCOUNT, email, {
          name,
          downloadLink: checkoutLink,
          code: discountCode,
        });
        res.status(200).send("OK");
      } catch (error) {
        console.error(error);
        res.status(500).send("ERROR");
      }

      return;
    }
    res.status(401).send("Unauthorized");
  }
}