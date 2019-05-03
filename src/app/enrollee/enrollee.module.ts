import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolleeRoutingModule } from './enrollee-routing.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProgramsComponent } from './programs/programs.component';
import { EnrolleeComponent } from './enrollee.component';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { PipesModule } from '../core/pipes/pipes.module';

@NgModule({
  declarations: [
    EnrolleeComponent,
    FeedbackFormComponent,
    CompaniesComponent,
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    EnrolleeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    PipesModule
  ],
  providers: []
})
export class EnrolleeModule {}
