import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorMeme } from './editor-meme';

describe('EditorMeme', () => {
  let component: EditorMeme;
  let fixture: ComponentFixture<EditorMeme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorMeme],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorMeme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
