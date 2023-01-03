import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TansactionListComponent } from './transaction-list.component';

describe('TansactionListComponent', () => {
  let component: TansactionListComponent;
  let fixture: ComponentFixture<TansactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TansactionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TansactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
