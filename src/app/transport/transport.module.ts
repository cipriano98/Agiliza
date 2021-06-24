import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItinerarioModule } from '../itinerario/itinerario.module';
import { TransportComponent } from './transport.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransportService } from './transport.service';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ItinerarioModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [TransportComponent],
  exports: [TransportComponent],
  providers: [TransportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransportModule { }
