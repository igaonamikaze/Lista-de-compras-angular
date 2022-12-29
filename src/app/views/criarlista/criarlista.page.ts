import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';
import { Item, Lista } from '../../models/lista.model';


@Component({
  selector: 'app-criarlista',
  templateUrl: './criarlista.page.html',
  styleUrls: ['./criarlista.page.scss'],
})
export class CriarlistaPage implements OnInit {
  itemForm: FormGroup;
  listaForm: FormGroup;
  userInfo: any = [];
  route: Router;
  isLoading: boolean = false;
  itens: Array<Item> = [];
  lista: Lista = {};
  constructor(
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private router: Router,
    private listaService: ListasService,
    private alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });
    this.listaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['']
    })
  }

  EnterSubmit($event) {
    if ($event.keyCode === 13) {
      this.includeItem();
    }
  }

  includeItem() {
    this.itens.push({
      nomeItem: this.itemForm.controls.nome.value.toUpperCase(),
      quantidade: parseInt(this.itemForm.controls.quantidade.value)
    });
  }
  excludeItem(i) {
    this.itens.splice(i, 1);
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
      header: 'Eba! Lista cadastrada com sucesso!!',
      message: 'Agora é só começar a usar!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }]
      
    });
    await alert.present();
  }

  submitList() {
    this.lista.nome = this.listaForm.controls.nome.value,
      this.lista.descricao = this.listaForm.controls.descricao.value,
      this.lista.itens = this.itens;

    this.listaService.createList(this.lista).subscribe(data => {
      if (!data.success) {
        return this.presentErrorAlert(data.data);
      }
      return this.presentSuccessAlert();
    }, (error) => {
      return this.presentErrorAlert(error.error.data)
    });
  }

}
