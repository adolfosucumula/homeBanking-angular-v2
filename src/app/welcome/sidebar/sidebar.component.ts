import { Component, Output } from '@angular/core';
import { menuItemsList } from './menu-items-list';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = menuItemsList
  userImg = 'https://media.licdn.com/dms/image/D4D03AQEnQcEH1eGdeQ/profile-displayphoto-shrink_800_800/0/1672836007935?e=2147483647&v=beta&t=Sfx47qVeN9ca7HH1fuuwoYNSEDyoTuXfNYn-Gf5symo'

  isLogged: boolean = false
  userdata: any = [{
    id: 0, username: "USERNAME", email: "user@smart-bank.com",
    userImg: 'https://media.licdn.com/dms/image/D4D03AQEnQcEH1eGdeQ/profile-displayphoto-shrink_800_800/0/1672836007935?e=2147483647&v=beta&t=Sfx47qVeN9ca7HH1fuuwoYNSEDyoTuXfNYn-Gf5symo'
  }];

  constructor( private localStore: StorageService){}

  ngOnInit(): void {

    this.isLogged = this.localStore.isLoggedIn();
    this.userdata = this.localStore.getUser();
  }
}
