import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MenueComponent } from './shared/components/menue/menue.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    NavbarComponent,
    MenueComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-crm';
  showFiller = false;
}
