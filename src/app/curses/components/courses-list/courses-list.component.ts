import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Courses } from '../../model/courses';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.css',
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatButtonModule, CategoryPipe]
})
export class CoursesListComponent {

  @Input() courseList!: Courses[];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns: string[] = ['id', 'name', 'category', 'Add'];

  constructor(
  ) { }

  onAdd() {
    // this.router.navigate(['new'],{relativeTo:this.route});
    this.add.emit(true);
  }

  onEdit(course: any) {
    this.edit.emit(course);
  }

  onDelete(course: any) {
    this.remove.emit(course);
  }

  
}
