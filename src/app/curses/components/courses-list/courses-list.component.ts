import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Courses } from '../../model/courses';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
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
