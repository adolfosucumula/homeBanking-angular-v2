import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/UserModel';

declare function showSideBar():void;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  user: UserModel = new UserModel()
  sidebarShow: boolean = true

  constructor(private title: Title){

  }


  @Input() page: string = ''

  ngOnInit(): void {
    this.title.setTitle(this.page)
  }

  showSidebar(){
    showSideBar();
  }


}
