import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../model/courses';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.css',
    standalone: true,
    imports: [MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatCheckboxModule]
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;
  selected = 'option2';
  watched=true;


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private location: Location,
    private activatedRouter: ActivatedRoute,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {

    //pega dentro do resolver
    const curso: Courses = this.activatedRouter.snapshot.data['coursex'];
debugger
    this.form = this.formBuilder.group({
      id: [curso.id],
      name: [curso.name, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      category: [curso.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retriveLesson(curso), [Validators.required])
    });
    console.log(this.form);
    console.log(this.form.value);

    //  this.form.patchValue({
    //    id: curso.id,
    //    name: curso.name,
    //    category: curso.category
    //  });
    //  console.log("curso " + curso);
  }

  private retriveLesson(curso: Courses) {

    const lessons = [];
    if (curso?.lessons) {
      curso.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  addewLe() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson())
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '', watched:false }): FormGroup<{ id: FormControl<string>, name: FormControl<string>, youtubeUrl: FormControl<string>, watched: FormControl<boolean>  }> {
    return this.formBuilder.group({
      id: [lesson.id,],
      name: [lesson.name, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.maxLength(150), Validators.minLength(10)]],
      watched:[lesson.watched]
    });
  }

  getLessonsFormArray(): any {
    return (<UntypedFormArray>this.form.get('lessons'))?.controls;
  }



  onSubmit() {
    debugger
    if (this.form.valid) {
      this.coursesService.save(this.form.value)
        .subscribe(
          result => {
            console.log(result),
              this.coursesService.onError('Salvo Com Sucesso'),
              this.onCancel()
          },
          error => {
            this.coursesService.onError('Erro ao Salvar curso')
          }
        );
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back()
  }

  openWindows(link: any) {
    window.open('https://www.youtube.com/'+link.value, '_blank');
  }
}
