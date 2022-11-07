import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('s1', { static: false }) s1: ElementRef;
  @ViewChild('s2', { static: false }) s2: ElementRef;
  @ViewChild('s3', { static: false }) s3: ElementRef;
  @ViewChild('bar', { static: false }) bar: ElementRef;

  progress: any = [];
  pages: any = [];
  barLinkWidth: number = 0;

  constructor() {}

  ngAfterViewInit() {
    this.progress = Array.prototype.slice.call(
      document.querySelectorAll('#percent > div')
    );
    this.pages = [
      this.s1.nativeElement,
      this.s2.nativeElement,
      this.s3.nativeElement
    ];
    this.barLinkWidth = 100 / this.pages.length;
    this.bar.nativeElement.setAttribute(
      'style',
      'width:' + this.barLinkWidth + '%'
    );
  }

  navigate(page) {
    for (var i = 0; i < this.pages.length; i++) {
      this.pages[i].classList.remove('show-page');
    }
    this.s1.nativeElement.classList.add('displayNone');
    page.classList.add('show-page');
    this.bar.nativeElement.style.width =
      this.barLinkWidth * page.getAttribute('id').slice(1) + '%';
  }

  whereYouAt() {
    this.bar.nativeElement.style.height = '22px';
    for (var i = 0; i < this.progress.length; i++) {
      this.progress[i].style.opacity = 1;
    }
  }

  revert() {
    this.bar.nativeElement.style.height = '3px';
    for (var i = 0; i < this.progress.length; i++) {
      this.progress[i].style.opacity = 0;
    }
  }
}
