import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursesRoutingModule } from './curses-routing.module';
import { CursesComponent } from './containers/curses/curses.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    CursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CursesRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule
    
  ]
})
export class CursesModule { }
