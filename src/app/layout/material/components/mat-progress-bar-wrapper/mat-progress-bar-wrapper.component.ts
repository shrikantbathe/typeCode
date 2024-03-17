import { Component, Input } from '@angular/core';
import { IMatProgressBar } from './models/IMatProgressBar';

@Component({
  selector: 'app-mat-progress-bar-wrapper',
  templateUrl: './mat-progress-bar-wrapper.component.html',
  styleUrls: ['./mat-progress-bar-wrapper.component.scss']
})
export class MatProgressBarWrapperComponent {

  @Input()
  public set animate(v: boolean) {
    if (!!v) this.progressBar = { bufferValue: 50, mode: 'indeterminate', value: 50 };
    else this.progressBar = { bufferValue: 50, mode: 'determinate', value: 100 };
  }

  public progressBar: IMatProgressBar = { bufferValue: 50, mode: 'indeterminate', value: 50 };

}