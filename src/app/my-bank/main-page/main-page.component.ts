import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { StorageService } from 'src/app/utils/StorageService.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  user: UserModel = new UserModel()

  public isVisited = true;
  public isLogged = false;
  username: any;

  //ViewChild is a method to catch the sidenav class
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  @Input() page: string = 'Home'

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute,
    private router: Router, private localStore: StorageService){

  }

  ngOnInit(): void {

    this.isLogged = this.localStore.isLoggedIn();
    this.username = this.localStore.getUser();
    //Check is the  user is logged. If false redirect him to the login page
    //Check is the  user is logged. If false redirect him to the login page
    if(!this.isLogged){
      this.router.navigate(['/signin']);
    }


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

