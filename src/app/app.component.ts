import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MenuController } from '@ionic/angular';
import { UserModel } from './models/user.model';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Tela Inicial', url: '/home', icon: 'home' },
    { title: 'Criar Lista', url: '/criarlista', icon: 'add-circle' },
  ];
  user: any;
  constructor(private loginService: LoginService, private router: Router, private menuController: MenuController, updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
  ngOnInit() {
    this.loginService.user.subscribe(user => {
      if (user) {
        this.menuController.swipeGesture(true);
        return this.user = user
      }
      this.menuController.swipeGesture(false);
    });
  }
  logout() {
    this.loginService.logout().subscribe(data => {
      if (data) {
        this.menuController.close();
        this.menuController.swipeGesture(false);
        return this.router.navigate(['/login']);
      }
    });

  }
}
