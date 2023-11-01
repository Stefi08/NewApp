import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

