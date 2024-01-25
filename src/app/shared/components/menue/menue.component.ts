import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenueCategorys } from '../../interfaces/menue-categorys';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menue',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.scss'
})
export class MenueComponent {
  categorys: MenueCategorys[] = [
    {
      name: 'Dashboard',
      icon: 'assignment',
      link: 'dashboard'
    },
    {
      name: 'Users',
      icon: 'perm_identity',
      link: 'users'
    },
    {
      name: 'Companies',
      icon: 'store',
      link: 'companies'
    }
  ];


  // not in Use now !
  // url!: string;

  // changeCategory(){
  //   this.getUrl();
  // }

  // getUrl() {
  //   this.url = window.p
  // }
}
