import { TestBed } from '@angular/core/testing';

import { JSONLectureService } from './jsonlecture.service';

describe('JSONLectureService', () => {
  let service: JSONLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
