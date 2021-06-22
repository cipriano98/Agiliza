import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Itinerario } from './itinerario';

const API = environment.api


@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getItinerary(id: number): Observable<Itinerario> {
    const url = `${API}&a=il&p=${id}`
    return this.http.get<Itinerario>(url).pipe(
      tap(
        itinerary => { },
        error => console.log(`Erro na função getItinerary → ${error}`)
      ),
    );
  }

}
