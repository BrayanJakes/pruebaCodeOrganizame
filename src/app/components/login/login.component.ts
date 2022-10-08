import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.login()
  }

  login(){
   this.auth.isAuthenticated$.subscribe({
    next: (resp: boolean) => {
      if(!resp){
        this.auth.loginWithRedirect();
      }else{
        this.router.navigateByUrl('/app')
      }
    }
   })
  }


}
