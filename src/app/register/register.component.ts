import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  
  register() {
    this.accoutService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel;
      },
      error: (error) => this.toastr.error(error.error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
