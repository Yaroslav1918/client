import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  get400ValidationError() {
    this.http.post(this.baseUrl + "account/register", {}).subscribe({
      error: error => {
        console.log(error);
        this.validationErrors = error;
      }
    })
  }
}
