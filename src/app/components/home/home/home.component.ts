import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = {};
  

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.dataUser()
  }

  dataUser(){
    this.auth.user$.subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.user = resp;
        localStorage.setItem('name', this.user.given_name)
      }
    })
  }

  salir(){
    this.auth.logout();
  }

}
