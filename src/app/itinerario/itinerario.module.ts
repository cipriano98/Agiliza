import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItinerarioComponent } from './itinerario.component';
import { ItinerarioService } from './itinerario.service';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
  ],
  declarations: [ItinerarioComponent],
  exports: [ItinerarioComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ItinerarioService],
})
export class ItinerarioModule { }
