import request from "request";
import crypto from "crypto";

const baseUrl: string = "https://api.coindcx.com";

export const createOrder = (
  side: "buy" | "sell",
  market: string,
  price: number,
  clientOrderId: string,
) => {
  const body = {
    side: "buy", //Toggle between 'buy' or 'sell'.
    order_type: "limit_order", //Toggle between a 'market_order' or 'limit_order'.
    market: "SNTBTC", //Replace 'SNTBTC' with your desired market.
    price_per_unit: "0.03244", //This parameter is only required for a 'limit_order'
    total_quantity: 400, //Replace this with the quantity you want
    timestamp: timeStamp,
    client_order_id: "2022.02.14-btcinr_1", //Replace this with the client order id you want
  };

  const payload = new Buffer(JSON.stringify(body)).toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const options = {
    url: baseurl + "/exchange/v1/orders/create",
    headers: {
      "X-AUTH-APIKEY": key,
      "X-AUTH-SIGNATURE": signature,
    },
    json: true,
    body: body,
  };

  request.post(options, function (error, response, body) {
    console.log(body);
  });
};
