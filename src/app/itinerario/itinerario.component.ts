import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Itinerario } from './itinerario';
import { ItinerarioService } from './itinerario.service';
import * as mapbox from 'mapbox-gl'

@Component({
  selector: 'itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})
export class ItinerarioComponent implements OnInit {

  itinerary!: Itinerario
  coords: any[] = []
  // coords: Coord[] = []

  constructor(
    private readonly service: ItinerarioService
  ) { }

  ngOnInit() {
    const box: typeof mapbox = mapbox
    box.accessToken = environment.accessTokenMapBox

    const map: mapbox.Map = new box.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        -51.22787310938000000, // Longitude
        -30.03251157730300000, // Latitude
      ],
      zoom: 13
    })
    this.renderMap(map)
  }

  private renderMap(map: mapbox.Map) {
    const coordinates: any[] = this.coords
    // this.coords.forEach(coord => {})
    // coordinates.push()

      map.on('load', function () {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            }
          }
        });
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#666',
            'line-width': 5
          }
        })
      })

  }

  public setItinerary(id: number) {
    this.service.getItinerary(id).subscribe(itinerary => {
      this.itinerary = itinerary
      const coords: any = itinerary
      this.coords = []
      Object.keys(coords).forEach((key, value) => {
        if (key != 'nome' && key != 'codigo' && key != 'idlinha') {
          const coordinate = [
            coords[value].lng,
            coords[value].lat,
          ]
          this.coords.push(coordinate)
        }
      })

      const map: mapbox.Map = new mapbox.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          -51.22787310938000000, // Longitude
          -30.03251157730300000, // Latitude
        ],
        zoom: 13
      })

      this.renderMap(map)
      console.dir(this.coords);
    })
  }

}
