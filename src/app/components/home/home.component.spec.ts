import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ HomeComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  });

  it('Dummy Test Case', () => {
    expect(0).toBe(0);
  });

});
