import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Item } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-usar-lista',
  templateUrl: './usar-lista.page.html',
  styleUrls: ['./usar-lista.page.scss'],
})
export class UsarListaPage implements OnInit {
  listaId: number;
  itens: Array<any>;
  listsItens: any;
  showUserTotalValue: number = 0.00;
  isLoading: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private listaService: ListasService, private loadingController: LoadingController, private alertController: AlertController) { }

  async ngOnInit() {
    await this.presentLoading();
    this.activatedRoute.params.subscribe(routeParams => {
      this.listaId = routeParams['id'];
      this.getMyListsItems(this.listaId)
      return routeParams
    });

  }
  getMyListsItems(listaId) {
    this.listaService.getMyListsItems(listaId).subscribe(response => {
      this.listsItens = response.data;
      this.itens = this.listsItens.items
      this.loadingController.dismiss('firstLoading');
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
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
      header: 'Eba! Itens salvos com Sucesso!!',
      message: 'Agora está tudo salvo conosco!',
      buttons:  [{
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('/home');
        }
      }]
    });
    await alert.present();
  }

  showUserTotal() {
    var total: number = 0.00
    this.showUserTotalValue = 0.00;
    this.itens = this.itens.map(element => {
      element.total = 0.00
      if (element.isChecked == false)
        element.valor = 0.00;
      element.total = (element.valor) ? element.valor * element.quantidade : 0.00;
      total += element.total
      return element
    });
    this.showUserTotalValue += total;
  }

  async onSubmit() {
    this.isLoading = true;
    const dataToSent = {
      id_lista: this.listaId,
      itens: this.itens,
      total: this.showUserTotalValue.toFixed(2)
    }
    this.listaService.checkList(dataToSent).subscribe(async data => {
      if (!data.success) {
        this.isLoading = false;
        return await this.presentErrorAlert(data.data);
      }
      this.isLoading = false;
      await this.presentSuccessAlert();
    }, error => {
      this.isLoading = false;
      this.presentErrorAlert(error.error.data);
    })
  }
}
