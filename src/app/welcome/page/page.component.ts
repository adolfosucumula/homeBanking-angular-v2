import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements AfterViewInit{

  public isVisited = true;
  isLogged: boolean = false;

  //ViewChild is a method to catch the sidenav class
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  @Input() page: string = 'Home'

  constructor(private observer: BreakpointObserver){

  }


  /**
   * Method to catch the page resize event
   * Check if the page size matches. If true change the sidenav mode to
   * 'over' and close it, if false open it setting to 'side' mode
   */
  ngAfterViewInit(){
    /*this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      Promise.resolve(res).then(() => {
        if(res.matches){
          this.sidenav.mode = 'over'
         this.sidenav.close()
        }else{
          this.sidenav.mode = 'side'
          this.sidenav.open()
        }
      })
    })*/
  }

}
