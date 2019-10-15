import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoPage } from './movie-info.page';

describe('MovieInfoPage', () => {
  let component: MovieInfoPage;
  let fixture: ComponentFixture<MovieInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
