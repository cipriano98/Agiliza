import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transport, Transports } from './transport';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTransport(type: Transports): Observable<Transport[]> {
    const url = `${API}&p=%&t=${type}`
    console.dir(url);
    return this.http.get<Transport[]>(url).pipe(
      tap(
        transport => { },
        error => console.log(`Erro na função getTransport → ${error}`)
      ),
    );
  }
  public getItinerary(id: number): Observable<any> {
    const url = `${API}&a=il&p=${id}`
    console.dir(url);
    return this.http.get<any>(url).pipe(
      tap(
        itinerary => { },
        error => console.log(`Erro na função getItinerary → ${error}`)
      ),
    );
  }

}
