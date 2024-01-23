import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { UserData } from '../../shared/interfaces/user-data';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  id: string = '';
  unsubData: any;

  constructor(private router: ActivatedRoute, private userServices: FirebaseService) {
    this.router.params.subscribe(params => {
      this.id = params['id']
    })
    
  }

  ngOnInit() {
    this.unsubData = this.userServices.subUser(this.id);
    console.log(this.getUser())
  }

  getUser():UserData {
    return this.userServices.user;
  }

  ngOnDestroy() {
    this.unsubData();
  }

}
