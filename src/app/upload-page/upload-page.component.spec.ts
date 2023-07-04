import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPageComponent } from './upload-page.component';

describe('UploadPageComponent', () => {
  let component: UploadPageComponent;
  let fixture: ComponentFixture<UploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#updateLoading should toggle #loading', () => {
    expect(component.loading)
      .withContext('hidden at first')
      .toBe(false);
    component.updateLoading(true);
    expect(component.loading)
      .withContext('on after click')
      .toBe(true);
      component.updateLoading(false);
    expect(component.loading)
      .withContext('off after second click')
      .toBe(false);
  });
});
