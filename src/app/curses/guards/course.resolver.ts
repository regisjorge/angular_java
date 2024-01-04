import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Courses } from '../model/courses';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Courses> = (route, state) => {
  if(route.params && route.params['id']){
    const service= inject(CoursesService);

    return service.loadById(route.params['id'])
  }
  return of({
    id: '',
    name: '',
    category: '',
    lessons: []
  });
};
