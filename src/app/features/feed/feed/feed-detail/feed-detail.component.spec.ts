import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDetailComponent } from './feed-detail.component';

describe('FeedDetailComponent', () => {
  let component: FeedDetailComponent;
  let fixture: ComponentFixture<FeedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
