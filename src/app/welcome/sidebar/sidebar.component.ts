import { Component } from '@angular/core';
import { menuItemsList } from './menu-items-list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = menuItemsList
  userImg = 'https://media.licdn.com/dms/image/D4D03AQEnQcEH1eGdeQ/profile-displayphoto-shrink_800_800/0/1672836007935?e=2147483647&v=beta&t=Sfx47qVeN9ca7HH1fuuwoYNSEDyoTuXfNYn-Gf5symo'
  username = 'Admin'
}
