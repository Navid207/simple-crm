import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface MenueCategorys {
  name: string;
  icon: string;
  activ:boolean;
  link?:string; 
}

@Injectable({
  providedIn: 'root'
})
export class MenueService {

  categorys: MenueCategorys[] = [
    {
      name: 'Dashboard',
      icon: 'assignment',
      link: 'dashboard',
      activ: false,
    },
    {
      name: 'Users',
      icon: 'perm_identity',
      link: 'users',
      activ: false,
    },
    {
      name: 'Companies',
      icon: 'store',
      link: 'companies',
      activ: false,
    }
  ];

  constructor (private router: Router) {
      }

  setActivCategory(){
    let url = this.router.url.slice(1)
    this.categorys.forEach(category => {
      category.activ = false;
      if (url === category.link) category.activ = true;
    });
  }
}
