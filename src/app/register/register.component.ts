import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  private accoutService = inject(AccountService);
  cancelRegister = output<boolean>();
  
  register() {
    this.accoutService.register(this.model).subscribe({
      next: res => {
        console.log(res);
        this.cancel;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
