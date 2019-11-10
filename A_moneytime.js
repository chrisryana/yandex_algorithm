function maxProfit(prices) {
  let localMaxProfit = 0; 
  for (let i = 0, l = prices.length; i < l; i++) {
    if (i + 1 !== l && prices[i] < prices[i+1]) {
      localMaxProfit += prices[i+1] - prices[i];
    }
  }

  return localMaxProfit;
}

const entry = [71,11,51,31,61,41]; // 70
const entry2 = [13,24,35,46,57]; // 44
const entry3 = [700,612,445,343,10]; // 0

console.log(maxProfit(entry), maxProfit(entry2), maxProfit(entry3));