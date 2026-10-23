import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Surpresa } from './surpresa';

describe('Surpresa', () => {
  let component: Surpresa;
  let fixture: ComponentFixture<Surpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surpresa],
    }).compileComponents();

    fixture = TestBed.createComponent(Surpresa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
