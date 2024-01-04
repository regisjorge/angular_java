import { Injectable } from '@angular/core';
import { Courses } from '../model/courses';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, first, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = "http://localhost:8080/api/courses";

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar) { }


    list(page=0 , pageSize=10): Observable<CoursePage> {

    return this._http.get<CoursePage[]>(this.API,{params:{page , pageSize}})
      .pipe(
        take(1),
        tap(console.log)
      )
  }

  save(record: Partial<Courses>) {// voce pode passar os valores parciais PARTIAL de COURSES
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }

  }

  update(record: Partial<Courses>) {
    return this._http.put<Courses>(`${this.API}/${record.id}`, record)
      .pipe(
        first()
      )
  }

  remove(record: Partial<Courses>) {
    console.log("entrou 1")
    return this._http.delete<Courses>(`${this.API}/${record.id}`)
      .pipe(
        first()
      )
  }

  private create(record: Partial<Courses>) {// voce pode passar os valores parciais PARTIAL de COURSES
    return this._http.post<Courses>(this.API, record)
      .pipe(
        first()
      )
  }

  public onError(texto: string) {
    this._snackBar.open(texto, '', {
       duration: 5000,
       verticalPosition: 'top',
       horizontalPosition: 'center' })
  }

  loadById(id: String) {
    return this._http.get<Courses>(`${this.API}/${id}`)
  }
}
