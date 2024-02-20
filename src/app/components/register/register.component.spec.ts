import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  });

  it('Dummy Test Case', () => {
    expect(0).toBe(0);
  });

});
