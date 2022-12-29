import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Item } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  public ListsItems: any;
  public Items: Array<any>;
  isLoading: boolean = false;
  newItems: any = {};
  @Input() id_lista: string;
  @Input() nome_lista: string;
  constructor(public modalCtrl: ModalController, private listaService: ListasService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.getMyListsItems();
  }
  getMyListsItems() {
    this.listaService.getMyListsItems(this.id_lista).subscribe(response => {
      this.ListsItems = response.data
      this.Items = this.ListsItems.items
    });
    this.isLoading = false;
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
      header: 'Eba! Lista atualizada com sucesso!!',
      message: 'Agora é só começar a usar!',
      buttons: ['OK']
    });
    await alert.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  async addNewItem() {
    if (this.newItems.nome && this.newItems.quantidade) {
      this.newItems.id_item = 0;
      this.newItems.nome = this.newItems.nome.toUpperCase();
      this.Items.push(this.newItems);
      this.newItems = {};
    } else {
      await this.presentErrorAlert('Adicione um nome e a quantidade!')
      this.newItems = {};
    }
  }
  salvarEdit() {
    this.listaService.updateList(this.ListsItems).subscribe(async data => {
      if (!data.success) {
        return await this.presentErrorAlert(data.data);
      }
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Eba! Lista atualizada com sucesso!!',
        message: 'Agora é só começar a usar!',
        buttons: [{
          text: 'Ok',
          handler: () => {
            window.location.reload;
            this.closeModal();
          }
        }]
      });
      return await alert.present();
    }, async (error) => {
      return await this.presentErrorAlert(error.error.data);
    });
  }
}
