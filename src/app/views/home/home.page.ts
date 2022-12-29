import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';
import { LoginService } from 'src/app/services/login.service';
import { StatsService } from 'src/app/services/stats.service';
import { ListaPage } from '../modals/lista/lista.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public myLists: Array<any>;
  user: any;
  userTotalItens: any;
  userTotalSpentByList: any;
  userTotalSpentItem: any;
  constructor(private activatedRoute: ActivatedRoute,
    private menu: MenuController,
    public listasService: ListasService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public loginService: LoginService,
    public stats: StatsService,
    public alertController: AlertController) { }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter() {
    this.loginService.user.subscribe(user => {
      if (user) {
        this.getLists(user.id);
        this.getUserStats(user.id);
        return this.user = user
      }
    });
  }
  getUserStats(userId?) {
    this.stats.getUserTotalItens(userId).subscribe(stats => this.userTotalItens = stats.data);
    this.stats.getUserTotalSpentByList(userId).subscribe(stats => this.userTotalSpentByList = stats.data);
    this.stats.getUserTotalSpentItem(userId).subscribe(stats => this.userTotalSpentItem = stats.data);
  }

  async getLists(id) {
    await this.presentLoading()
    return this.listasService.getMyLists(id).subscribe(response => {
      this.myLists = response.data;
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

  async modalProtetiva(id?, nome?) {
    const modal = await this.modalController.create({
      component: ListaPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'id_lista': id,
        'nome_lista': nome,
      }
    });
    return await modal.present();
  }

  openList(id?, nome?) {
    this.modalProtetiva(id, nome);
  }

  async presentConfirmAlert(lists_id?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opa! Tem certeza que deseja excluir a lista?',
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.listasService.deleteList(lists_id).subscribe(data => {
            window.location.reload();
            return data;
          }, error => {
            return error;
          });
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          alert.dismiss();
        }
      }]

    });
    await alert.present();
  }

  deleteList(list_id?) {
    this.presentConfirmAlert(list_id);
  }

}
