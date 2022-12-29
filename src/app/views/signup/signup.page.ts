import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
      validatePass: ['', Validators.required],
    }, { validator: this.checkPasswords })
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('pass').value;
    const confirmPassword = group.get('validatePass').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  async presentErrorAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops! Houve um erro :(',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentSuccessAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eba! Cadastrado com Sucesso!!',
      message: 'Bem vind@! Faça o login e começe a se organizar!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async submitForm() {
    this.isLoading = true;
    var email = this.loginForm.value.email;
    var nome = this.loginForm.value.name;
    var pass = this.loginForm.value.pass;
    var validatePass = this.loginForm.value.validatePass;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return this.presentErrorAlert('Preencha todos os campos!')
    }
    this.loginService
      .signup({ email, pass, nome })
      .subscribe(
        async (data) => {
          if (!data.success) {
            this.isLoading = false;
            this.presentErrorAlert(data.data);
          }
          await this.presentSuccessAlert()
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false;
          this.presentErrorAlert(error.error.data);
        }
      );

  }
}
