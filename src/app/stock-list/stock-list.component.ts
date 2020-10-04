import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MockService } from '../mock/mock.service';
import { MockConsumerService } from '../mockConsumer/mock-consumer.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'assetName', 'price', 'lastUpdate'];
  stocks = {};
  currency = {};
  dataSourceStock = new MatTableDataSource([]);
  dataSourceCurrency = new MatTableDataSource([]);

  favorites = [];
  order = 'asc';
  @ViewChild(MatSort) sortStock: MatSort;
  @ViewChild(MatSort) sortCurrency: MatSort;

  @ViewChild('table1') table1: any;
  @ViewChild('table1') table2: any;

  constructor(
    private mockService: MockService,
    private data: MockConsumerService
  ) {}

  ngOnInit(): void {
    this.data.getAssets.subscribe((assetList) => {
      this.updateAssets(assetList.stock, 'stocks');
      this.updateAssets(assetList.currency, 'currency');
      this.dataSourceCurrency.data = Object.values(assetList.currency);
      this.dataSourceStock.data = Object.values(assetList.stock);
    });

    this.data.favoritesSubscription.subscribe((data) => {
      this.favorites = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceStock.sort = this.sortStock;
    this.dataSourceCurrency.sort = this.sortCurrency;
  }

  addFavorite(id): void {
    if (!this.favorites.includes(id)) {
      this.data.addFavorite(id);
    }
  }

  updateAssets(assetList, type) {
    for (const key in assetList) {
      if (this[type][key]) {
        this[type][key].lastUpdate = assetList[key].lastUpdate;
        this[type][key].price = assetList[key].price;
      } else {
        this[type][key] = assetList[key];
      }
    }
  }
}
