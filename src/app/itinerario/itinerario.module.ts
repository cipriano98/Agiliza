import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { SkeletonLoaderModule } from '../shared/skeleton-loader/skeleton-loader.module';
import { ItinerarioComponent } from './itinerario.component';
import { ItinerarioService } from './itinerario.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    // Shered
    SkeletonLoaderModule,

    // Material
    MatCardModule,
  ],
  declarations: [ItinerarioComponent],
  exports: [ItinerarioComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ItinerarioService],
})
export class ItinerarioModule { }
