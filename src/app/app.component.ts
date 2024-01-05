import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [MatToolbarModule, RouterOutlet]
})
export class AppComponent {
  title = 'crud-angular';

  constructor() {
    console.log(environment.production); // Logs false for development environment
  }
}
