import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItinerarioModule } from '../itinerario/itinerario.module';
import { TransportComponent } from './transport.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransportService } from './transport.service';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ItinerarioModule,

    AngularMaterialModule
  ],
  declarations: [TransportComponent],
  exports: [TransportComponent],
  providers: [TransportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransportModule { }
