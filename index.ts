import axios from "axios";
import { Depthmanager } from "./DepthManagar";

const solInrMarket = new Depthmanager("B-SOL_INR");
const usdtInrMarket = new Depthmanager("B-USDT_INR");
const solUsdtMarket = new Depthmanager("B-SOL_USDT");

setInterval(() => {
  console.log(solInrMarket.getRelevantDepth());
  console.log(usdtInrMarket.getRelevantDepth());
  console.log(solUsdtMarket.getRelevantDepth());
}, 2000);
