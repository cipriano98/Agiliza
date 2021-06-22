import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItinerarioComponent } from './itinerario.component';
import { ItinerarioService } from './itinerario.service';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [ItinerarioComponent],
  exports: [ItinerarioComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ItinerarioService],
})
export class ItinerarioModule { }
