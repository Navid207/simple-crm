import { Component } from '@angular/core';
import { MenueService } from '../../shared/services/menue/menue.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private menue: MenueService) {
    this.menue.setActivCategory('dashboard');
  }
}
