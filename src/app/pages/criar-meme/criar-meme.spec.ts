import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarMeme } from './criar-meme';

describe('CriarMeme', () => {
  let component: CriarMeme;
  let fixture: ComponentFixture<CriarMeme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarMeme],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarMeme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
