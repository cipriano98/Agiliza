import { Component, Input } from '@angular/core';

@Component({
  selector: 'skeleton-loader',
  template: `
    <div [ngStyle]="renderStyles()" class="loader"></div>
  `,
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {

  @Input() SLwidth?: string = '30';
  @Input() SLheight?: string = '13.5';
  @Input() SLcircle?: boolean = false;

  constructor() { }

  renderStyles() {
    const myStyles = {
        'width.px': this.SLwidth ? this.SLwidth : '30',
        'height.px': this.SLheight ? this.SLheight : '13.5',
        'border-radius': this.SLcircle ? '50%' : ''
    };
    return myStyles;
}

}
