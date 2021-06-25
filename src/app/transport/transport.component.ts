import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ItinerarioComponent } from '../itinerario/itinerario.component';
import { Transport, Transports } from './transport';
import { TransportService } from './transport.service';

@Component({
  selector: 'transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  @ViewChild(ItinerarioComponent) itinerario!: ItinerarioComponent

  applyingFilter!: boolean
  transports!: Transport[]
  transportsFilter!: Transport[]
  itinerary!: any
  active?: number
  loadLength: any[] = []
  transportSelected: Transports = 'o'

  constructor(
    private readonly service: TransportService
  ) { }

  ngOnInit() {
    this.loadLength.length = 9
    this.applyingFilter = true
    this.render('o')
  }

  getImgStyle() {
    const style: string = this.transportSelected == 'o' ? 'img-onibus' : 'img-lotacao'
    return `img ${style}`
  }

  isActive(id: number) {
    if(!this.active) this.active = 0
    const style: string = this.active === id ? 'active' : ''
    return style
  }

  setItinerary(id: number){
    this.active = id
    this.itinerario.setItinerary(id)
  }

  render(transport: Transports) {
    this.transports = []
    this.transportsFilter = []
    this.service.getTransport(transport).subscribe(t => {
      this.transports = this.transportsFilter = t
      this.applyingFilter = false
    })
  }

  changeTransport(change: MatButtonToggleChange) {
    this.transportSelected = change.value
    this.applyingFilter = true
    this.render(change.value as Transports)
  }

  changeSearch(event?: any) {
    const value: string = event.target.value
    if (!value) return this.transports = this.transportsFilter
    const filtro = this.transportsFilter.filter(b => b.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    this.transports = []
    return this.transports = filtro
  }

}
