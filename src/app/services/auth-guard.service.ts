import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.loginService.userValue;
    if (!user) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
    this.loginService.check().subscribe((res) => {
      return true
    },
      (error) => {
        if (error) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false;
        }
      });
    return true;
  }
}
