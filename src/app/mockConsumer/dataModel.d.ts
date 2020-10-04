interface Asset {
  id: number;
  assetName: string; // "USD", Samsung Electronics Co Ltd : "SSNLF"
  price: number; // asset current price relative to USD
  lastUpdate: number; // unix timestamp
  type: 'Currency' | 'Stock';
}
