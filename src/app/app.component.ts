import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
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

  // SET TO ANY AMOUNT!
  sectionLength = 4;

  barLinkWidth = 0;
  currentSection = 0;
  progress: any = [];
  Math: any;

  constructor(private _cd: ChangeDetectorRef) {
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
    this.btnGroup.nativeElement.style.gridTemplateColumns =
      'repeat(' + this.sectionLength + ', auto)';
  }

  navigate(sectionIndex: number) {
    this.currentSection = sectionIndex;
    let arr = Array.from(this.sections);
    arr.forEach(() => {
      arr[sectionIndex].nativeElement.classList.remove('show-page');
    });
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
