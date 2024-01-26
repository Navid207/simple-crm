import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MenueService } from '../../services/menue/menue.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menue',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.scss'
})
export class MenueComponent {

  @Input() fixed!: boolean;
  @Input() slidBar!: MatDrawer;

  constructor(public menue: MenueService) { }

  closeSlidBar() {
    if (this.fixed) return
    this.slidBar.close();
  }

  color(): string {
    if (this.fixed) return '#ffffff'
    else return '#ffffff42'
  }

  toggleFixed() {
    this.fixed = !this.fixed; 
  }

  tooltipInfo():string {
    if (this.fixed) return 'click to unpin the slide menus'
    else return 'click to pin the Slide-Menus'
  }
}
