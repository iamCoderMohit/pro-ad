import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDashboard } from './campaigns-dashboard';

describe('CampaignsDashboard', () => {
  let component: CampaignsDashboard;
  let fixture: ComponentFixture<CampaignsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
