import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  hidden = false;
  public isLogged = false;
  username: any;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute,
    private router: Router, private localStore: StorageService){

  }

  ngOnInit(): void {

    this.isLogged = this.localStore.isLoggedIn();
    this.username = this.localStore.getUser();


  }


}
