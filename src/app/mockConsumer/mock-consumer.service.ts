import { Injectable } from '@angular/core';
import {MockService} from '../mock/mock.service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MockConsumerService {
  getAssets: Subject<any> = new Subject<any>();
  favoritesSubscription: Subject<any[]> = new Subject<any[]>();
  favorites = [];
  sortBySubscription: Subject<{currency: null, stocks: null}> = new Subject<{currency: null, stocks: null}>();
  asset: Asset;
  assetList: {stock: { [key: string]: Asset }, currency: { [key: string]: Asset }} = {stock: {}, currency: {}};
  constructor(private mockService: MockService) {
    mockService.assetSubscription.subscribe(data => {
      this.filterAssets(data);
    });
  }

  filterAssets(data): void {
    data.forEach((asset: Asset) => {
        this.assetList[asset.type.toLowerCase()][asset.id] = asset;
    });
    this.getAssets.next(this.assetList);
  }

  addFavorite(data): void {
    this.favorites.push(data);
    this.favoritesSubscription.next(this.favorites);
  }
}
