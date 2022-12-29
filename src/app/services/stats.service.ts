import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUserTotalItens(idUser?) {
    return this.httpClient.post<any>(this.apiUrl + 'stats/itens', { user_id: idUser })
      .pipe(map(lista => lista));
  }
  getUserTotalSpentByList(idUser?) {
    return this.httpClient.post<any>(this.apiUrl + 'stats/value-list', { user_id: idUser })
      .pipe(map(lista => lista));
  }
  getUserTotalSpentItem(idUser?) {
    return this.httpClient.post<any>(this.apiUrl + 'stats/value-item', { user_id: idUser })
      .pipe(map(lista => lista));
  }
}
