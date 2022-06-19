import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoadingComponent } from 'src/app/shared/modules/loading/components/loading/loading.component';

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {}
