import { TestBed } from '@angular/core/testing';

import { MockConsumerService } from './mock-consumer.service';

describe('MockConsumerService', () => {
  let service: MockConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
