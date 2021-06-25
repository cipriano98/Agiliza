import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SkeletonLoaderComponent } from './skeleton-loader.component';

@NgModule({
  declarations: [SkeletonLoaderComponent],
  imports: [CommonModule],
  exports: [SkeletonLoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkeletonLoaderModule { }
