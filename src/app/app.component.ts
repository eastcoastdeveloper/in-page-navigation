import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChildren('sections') sections: QueryList<ElementRef>;
  @ViewChild('btnGroup', { static: false }) btnGroup: ElementRef;
  @ViewChild('bar', { static: false }) bar: ElementRef;

  progress: any = [];
  sectionLength = 5;
  barLinkWidth: number = 0;
  Math: any;

  constructor(
    private _elements: ElementRef,
    private _cd: ChangeDetectorRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.Math = Math;
  }

  ngAfterViewInit() {
    this._cd.detectChanges();
    this.progress = Array.prototype.slice.call(
      document.querySelectorAll('#percent > div')
    );
    this.barLinkWidth = 100 / this.sections.length;
    this.bar.nativeElement.setAttribute(
      'style',
      'width:' + this.barLinkWidth + '%'
    );
    this._renderer.setStyle(
      this.btnGroup.nativeElement,
      'grid-template-columns',
      this.sectionLength
    );
  }

  navigate(sectionIndex: number) {
    let arr = Array.from(this.sections);
    arr.forEach((val, i) => {
      arr[sectionIndex].nativeElement.classList.remove('show-page');
    });
    arr[0].nativeElement.classList.add('displayNone');
    arr[sectionIndex].nativeElement.classList.add('show-page');
    this.bar.nativeElement.style.width =
      this.barLinkWidth * (sectionIndex + 1) + '%';
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
