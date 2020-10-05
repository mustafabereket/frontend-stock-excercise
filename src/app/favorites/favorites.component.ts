import { Component, OnInit, Input } from '@angular/core';
import {MockConsumerService} from '../mockConsumer/mock-consumer.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites = [];
  @Input() currency = {};
  @Input() stocks = {};
  constructor(private favoritesService: MockConsumerService) { }

  ngOnInit(): void {
    this.favoritesService.favoritesSubscription.subscribe((data) => {
      this.favorites = data;
    });
  }

}
