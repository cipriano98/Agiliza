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
  markerA!: mapbox.Marker
  markerB!: mapbox.Marker
  mapStyle = {
    light: 'mapbox://styles/mapbox/streets-v11',
    dark: 'mapbox://styles/mapbox/dark-v10',
  }
  // coords: Coord[] = []
  map!: mapbox.Map
  mapboxData: any
  constructor(
    private readonly service: ItinerarioService
  ) { }

  ngOnInit() {
    if (!mapbox.supported()) {
      alert('Your browser does not support Mapbox GL');
    }
    else {
      this.renderMap()
    }
  }

  private renderMap() {

    this.map = new mapbox.Map({
      container: 'map',
      style: this.mapStyle.light,
      accessToken: environment.accessTokenMapBox,
      testMode: true,
      center: [
        -51.0976548, // Longitude
        -30.0518008, // Latitude
      ],
      zoom: 11
    })

    this.map.on('load', () => {
      this.map.addControl(new mapbox.NavigationControl())
      this.map.addControl(new mapbox.FullscreenControl())
    })

  }

  getImgStyle() {
    const style: string = this.itinerarySelected == 'o' ? 'img-onibus' : 'img-lotacao'
    return `img ${style}`
  }

  public setItinerary(id: number) {
    if (this.previusId == id) return this.centralizarRota()

    this.service.getItinerary(id).subscribe(itinerary => {
      this.itinerary = itinerary
      this.itinerarySelected = this.transportSelected
      const coords: any = itinerary
      this.coords = []
      if (this.markerA && this.markerB) {
        this.markerA.remove()
        this.markerB.remove()
      }
      Object.keys(coords).forEach((key, value) => {
        if (key != 'nome' && key != 'codigo' && key != 'idlinha') {
          const coordinate: [number, number] = [
            coords[value].lng,
            coords[value].lat,
          ]
          this.coords.push(coordinate)
        }
      })

      if (this.previusId) {
        this.map.removeLayer('route')
        this.map.removeSource('route')
      }
      this.mapboxData = {
        type: 'Feature',
        properties: {
          name: itinerary.nome
        },
        geometry: {
          type: 'LineString',
          coordinates: this.coords,
        }
      }
      this.map.addSource('route', {
        type: 'geojson',
        data: this.mapboxData,
      })
      .addLayer({
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
      this.markerA = new mapbox.Marker().setLngLat(this.coords[0]).addTo(this.map)
      this.markerB = new mapbox.Marker().setLngLat(this.coords[this.coords.length - 1]).addTo(this.map)
      this.markerA.remove()
      this.markerB.remove()
      this.previusId = id
      this.centralizarRota()
    })

  }


  centralizarRota() {
    const coordinates = this.mapboxData.geometry.coordinates

    const bounds = coordinates.reduce((bounds: any, coord: any) => {
      return bounds.extend(coord)
    }, new mapbox.LngLatBounds(coordinates[0], coordinates[0]))

    this.map.fitBounds(bounds, {
      padding: 100,
      duration: 2000
    })
  }

}
