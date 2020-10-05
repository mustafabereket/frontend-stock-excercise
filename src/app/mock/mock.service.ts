import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MockService {

  assets: any[];
  assetSubscription: Subject<any> = new Subject<any>();
  timeObservable = interval(1111);

  createAsset = (assetId, assetType) => {
    return {
      id: assetId,
      assetName: assetType === 'Stock' ? ['AAPL', 'GOOGL', 'FB', 'TSLA', 'MSFT'][Math.floor(Math.random() * 4)] : ['EUR', 'USD', 'GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
      price: Math.random() * 10,
      lastUpdate: Date.now(),
      type: assetType
    };
  }

  getAllAssets = (n) => {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(this.createAsset(i, 'Stock'));
      result.push(this.createAsset(i + n, 'Currency'));
    }
    return result;
  }

  constructor() {
    this.assets = this.getAllAssets(200);
    console.log(this.assets);

    this.timeObservable.subscribe((d) => {
      this.assets.map(val => {
        const random = Math.random();
        val.price = random >= 0.5 ? val.price + random * 10 : val.price - random * 10;
        val.lastUpdate = Date.now();
        return val;
      });
      this.assetSubscription.next(this.assets);
    });
  }
}
