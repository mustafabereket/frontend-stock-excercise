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
  filterAssets = {
    currency: ['GBP', 'NIS', 'EUR', 'USD'],
    stocks: ['FB', 'TSLA', 'GOOGL', 'AAPL'],
    stockFilter: {
      name: '',
      operator: '',
      price: null
    },
    currencyFilter : {
      name: '',
      operator: '',
      price: null
    }
  };
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
      this.dataSourceStock.data = this.filterBy(
        'stocks',
        this.filterAssets.stockFilter.name,
        this.filterAssets.stockFilter.operator,
        this.filterAssets.stockFilter.price);
      this.dataSourceCurrency.data = this.filterBy(
        'currency',
        this.filterAssets.currencyFilter.name,
        this.filterAssets.currencyFilter.operator,
        this.filterAssets.currencyFilter.price);
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceStock.sort = this.sortStock;
    this.dataSourceCurrency.sort = this.sortCurrency;
  }

  addFavorite(id): void {
    if (!this.data.favorites.includes(id)) {
      this.data.addFavorite(id);
    }
  }

  updateAssets(assetList, type): void {
    for (const key in assetList) {
      if (this[type][key]) {
        this[type][key].lastUpdate = assetList[key].lastUpdate;
        this[type][key].price = assetList[key].price;
      } else {
        this[type][key] = assetList[key];
      }
    }
  }

  filterBy(assetType, filter, filterParam?, price?): any {
    if (!filter){
      return Object.values(this[assetType]);
    }
    return Object.values(this[assetType]).filter((obj: Asset) => {
      if (filterParam){
        return filterParam === '>' ? obj.price > price : obj.price < price;
      } else {
        return obj.assetName === filter;
      }
    });
  }

  clearFilters(type): void{
    this.filterAssets[type + 'Filter'] = {
      name: '',
      operator: '',
      price: null
    };
  }
}
