import axios from "axios";

export class Depthmanager {
  private market: string;
  private bids: {
    [key: string]: string;
  };
  private asks: {
    [key: string]: string;
  };

  constructor(market: string) {
    this.market = market;
    this.bids = {};
    this.asks = {};
    setInterval(() => {
      this.market = market;
      this.poolMarket();
    }, 3000);
  }

  async poolMarket() {
    try {
      const depth = await axios.get(
        `https://public.coindcx.com/market_data/orderbook?pair=${this.market}`,
        {
          headers: { "Accept-Encoding": "gzip, deflate" },
        },
      );
      this.bids = depth.data.bids;
      this.asks = depth.data.asks;
    } catch (error) {
      console.error("Error fetching market depth:", error);
    }
  }

  getRelevantDepth() {
    try {
      let highestBid = -100;
      let lowestAsk = 10000000;

      highestBid = Math.max(...Object.keys(this.bids).map(parseFloat));
      lowestAsk = Math.min(...Object.keys(this.asks).map(parseFloat));

      return {
        highestBid,
        lowestAsk,
      };
    } catch (error) {
      console.error("Error calculating relevant depth:", error);
    }
  }
}
