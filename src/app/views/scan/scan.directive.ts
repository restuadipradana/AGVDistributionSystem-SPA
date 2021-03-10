import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScan]'
})
export class ScanDirective implements AfterViewInit{

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
