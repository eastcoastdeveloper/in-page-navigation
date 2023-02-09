import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  markup: string;
  typescript: string;
  style: string;

  @ViewChildren('percentages') percentages: QueryList<ElementRef>;
  @ViewChildren('sections') sections: QueryList<ElementRef>;
  @ViewChild('btnGroup', { static: false }) btnGroup: ElementRef;
  @ViewChild('bar', { static: false }) bar: ElementRef;

  // SET TO ANY AMOUNT!
  sectionLength = 3;

  barLinkWidth = 0;
  currentSection = 0;
  Math: any;

  constructor(
    private _cd: ChangeDetectorRef,
  ) {
    this.Math = Math;
  }

  ngAfterViewInit() {
    this._cd.detectChanges();

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
    this.bar.nativeElement.style.width =
      this.barLinkWidth * (sectionIndex + 1) + '%';
  }

  showProgressBar() {
    this.bar.nativeElement.style.height = '22px';
    this.percentages.forEach((val) => {
      val.nativeElement.style.opacity = 1;
    });
  }

  hideProgressBar() {
    this.bar.nativeElement.style.height = '3px';
    this.percentages.forEach((val) => {
      val.nativeElement.style.opacity = 0;
    });
  }
}
