import { Depthmanager } from "./DepthManagar";
import { cancelAll, createOrder } from "./order";

const solInrMarket = new Depthmanager("B-SOL_INR");
const usdtInrMarket = new Depthmanager("B-USDT_INR");
const solUsdtMarket = new Depthmanager("B-SOL_USDT");

setInterval(() => {
  console.log(solInrMarket.getRelevantDepth());
  console.log(usdtInrMarket.getRelevantDepth());
  console.log(solUsdtMarket.getRelevantDepth());

  const canGetInr = solInrMarket.getRelevantDepth().highestBid - 0.001;
  const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
  const canGetSol = canGetUsdt / solUsdtMarket.getRelevantDepth().lowestAsk;
  console.log(`You can now convert $${1} to ${canGetSol} Sol`);

  const initialInr = solInrMarket.getRelevantDepth()?.lowestAsk + 0.001;
  const canGetUsdt2 = usdtInrMarket.getRelevantDepth()?.highestBid;
  const canGetInr2 = usdtInrMarket.getRelevantDepth()?.highestBid * canGetUsdt2;
  console.log(`You can now convert ${initialInr} Sol to ₹${canGetInr2}`);
}, 2000);

async function main() {
  const highestBid = solInrMarket.getRelevantDepth().highestBid;
  console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
  await createOrder(
    "buy",
    "XAIINR",
    (parseFloat(highestBid) + 0.01).toFixed(3),
    10,
    Math.random().toString(),
  );
  await new Promise((r) => setTimeout(r, 10000));
  await cancelAll("XAIINR");
  await new Promise((r) => setTimeout(r, 1000));
  main();
}

setTimeout(async () => {
  main();
}, 2000);
