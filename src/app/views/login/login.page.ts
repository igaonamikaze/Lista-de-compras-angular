import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  loginForm: FormGroup;
  isSubmitted = false;
  isLoading: boolean;
  route: Router;
  constructor(public formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  EnterSubmit($event) {
    if ($event.keyCode === 13) {
      this.submitForm();
    }
  }

  async presentAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops! Houve um erro :(',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async submitForm() {
    this.isLoading = true;
    var login = this.loginForm.value.login;
    var pass = this.loginForm.value.pass;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return this.presentAlert('Insira seu usuário e senha!')
    }
    this.loginService
      .login({ login, pass })
      .subscribe(
        (data) => {
          if(!data.success) {
            this.isLoading = false;
            return this.presentAlert(data.data)
          }
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          this.presentAlert(error.data);
        }
      );

  }

}
