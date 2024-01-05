import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses } from '../../model/courses';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';



@Component({
    selector: 'app-curses',
    templateUrl: './curses.component.html',
    styleUrl: './curses.component.css',
    standalone: true,
    imports: [MatCardModule, MatToolbarModule, CoursesListComponent, MatPaginatorModule, MatProgressSpinnerModule, AsyncPipe]
})
export class CursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'Add'];
  courses$!: Observable<CoursePage> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex=0;
  pageSize=10;
  length=20
 

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Courses) {

    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onRemove(course: Courses) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem Certeza que deseja remover este curso',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course).subscribe(
          () => {
            this.coursesService.onError(`Removido  o Curso ( ${course.name} ) com sucesso`),
              this.refresh()
          },
          error => {
            this.onError("Erro ao remover Curso");
          }
        );
      }
    });

  }

  refresh(pageEvent: PageEvent  = {length:0, pageIndex:0, pageSize:10}) {
    debugger
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize )
      .pipe(
        tap( () => {
          this.pageIndex=pageEvent.pageIndex,
          this.pageSize=pageEvent.pageSize
        }),
        catchError(error => {
          console.log(error.value);
          this.onError("Erro ao Carregar Cursos");
          return of({courses:[],totalElements:0,totalPages:0});
        })
      );
  }

  

}
