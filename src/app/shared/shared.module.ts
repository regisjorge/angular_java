import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ErrorDialogComponent,
        CategoryPipe,
        ConfirmationDialogComponent
    ],
    exports: [
        ErrorDialogComponent,
        CategoryPipe
    ]
})
export class SharedModule { }
