import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a secure code on initialization', () => {
    expect(component.secureCode).toBeTruthy();
    expect(component.secureCode.length).toBe(60);
  });

  it('should display the correct secure code in the template', () => {
    const secureCodeElement = fixture.debugElement.query(
      By.css('p.text-gray-200'),
    ).nativeElement;
    expect(secureCodeElement.textContent.trim()).toBe(component.secureCode);
  });

  it('should have a header with the correct title', () => {
    const headerElement = fixture.debugElement.query(
      By.css('header h1'),
    ).nativeElement;
    expect(headerElement.textContent.trim()).toBe('A Guide to Time Travel');
  });

  it('should have a login link in the header', () => {
    const loginLink = fixture.debugElement.query(
      By.css('header a[routerLink="/login"]'),
    ).nativeElement;
    expect(loginLink).toBeTruthy();
    expect(loginLink.textContent.trim()).toBe('Login');
  });

  it('should render a background video', () => {
    const videoElement = fixture.debugElement.query(
      By.css('video'),
    ).nativeElement;
    expect(videoElement).toBeTruthy();
    expect(videoElement.autoplay).toBeTrue();
    expect(videoElement.muted).toBeTrue();
    expect(videoElement.loop).toBeTrue();
  });

  it('should render the footer with a GitHub link and icon', () => {
    const githubLink = fixture.debugElement.query(
      By.css('footer a[href="https://github.com"]'),
    ).nativeElement;
    expect(githubLink).toBeTruthy();

    const githubIcon = fixture.debugElement.query(
      By.css('footer img[alt="GitHub Icon"]'),
    ).nativeElement;
    expect(githubIcon).toBeTruthy();
    expect(githubIcon.getAttribute('src')).toBe('assets/github-icon.png');
  });
});
