import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderSpinnerService } from '../loader-spinner.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css']
})
export class LoaderSpinnerComponent {

  constructor(public loader: LoaderSpinnerService){}

}
