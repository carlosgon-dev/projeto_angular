import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaPassword } from './nova-password';

describe('NovaPassword', () => {
  let component: NovaPassword;
  let fixture: ComponentFixture<NovaPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
