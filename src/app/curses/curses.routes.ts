import { Routes } from "@angular/router";
import { CursesComponent } from "./containers/curses/curses.component";
import { CourseFormComponent } from "./containers/course-form/course-form.component";
import { courseResolver } from "./guards/course.resolver";

export const COURSES_ROUTES: Routes = [
    {path:'', component:CursesComponent},
    {path:'new', component:CourseFormComponent, resolve:{coursex: courseResolver}},
    {path:'edit/:id', component:CourseFormComponent, resolve:{coursex: courseResolver}}
    
   ];