import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gerador } from './gerador';

describe('Gerador', () => {
  let component: Gerador;
  let fixture: ComponentFixture<Gerador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerador],
    }).compileComponents();

    fixture = TestBed.createComponent(Gerador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
