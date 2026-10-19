import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoMeme } from './cartao-meme';

describe('CartaoMeme', () => {
  let component: CartaoMeme;
  let fixture: ComponentFixture<CartaoMeme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoMeme],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoMeme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
