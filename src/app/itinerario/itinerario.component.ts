import { Component, Input, OnInit } from '@angular/core';
import * as mapbox from 'mapbox-gl'
import { environment } from 'src/environments/environment';

import { Transports } from '../transport/transport';
import { Itinerario } from './itinerario';
import { ItinerarioService } from './itinerario.service';

@Component({
  selector: 'itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})
export class ItinerarioComponent implements OnInit {

  @Input() transportSelected!: Transports
  itinerarySelected!: Transports
  itinerary!: Itinerario
  coords: any[] = []
  previusId!: number
  mapStyle = {
    light: 'mapbox://styles/mapbox/streets-v11',
    dark: 'mapbox://styles/mapbox/dark-v10',
  }
  // coords: Coord[] = []
  map!: mapbox.Map
  constructor(
    private readonly service: ItinerarioService
  ) { }

  ngOnInit() {
    const box: typeof mapbox = mapbox
    box.accessToken = environment.accessTokenMapBox

    const map: mapbox.Map = new box.Map({
      container: 'map',
      style: this.mapStyle.light,
      center: [
        -51.0976548, // Longitude
        -30.0518008, // Latitude
        // -51.22787310938000000,
        // -30.03251157730300000,
      ],
      zoom: 11
    })
    this.map = map
    this.renderMap(this.map)
  }

  private renderMap(map: mapbox.Map) {
    this.map.on('load', () => {
      this.map.addControl(new mapbox.NavigationControl())
    })

  }

  getImgStyle() {
    const style: string = this.itinerarySelected == 'o' ? 'img-onibus' : 'img-lotacao'
    return `img ${style}`
  }

  public setItinerary(id: number) {
    this.service.getItinerary(id).subscribe(itinerary => {
      this.itinerary = itinerary
      this.itinerarySelected = this.transportSelected
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

      const coord = +String((this.coords.length - 1) / 2).split('.')[0]

      this.map.setCenter(this.coords[coord])
      const coordinates: any[] = this.coords
      if (this.previusId) {
        this.map.removeLayer('route')
        this.map.removeSource('route')
      }
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          }
        },
      })
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': this.transportSelected == 'o' ? 'blue' : 'red',
          'line-width': 5
        }
      })
      this.previusId = id
    })
  }

}
