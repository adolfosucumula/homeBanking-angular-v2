import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/UserModel';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  user: UserModel = new UserModel()

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
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{

      if(res.matches){
        this.sidenav.mode = 'over'
        this.sidenav.close()
      }else{
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
    })
  }

}

