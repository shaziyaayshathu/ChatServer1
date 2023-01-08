import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup |any;
  
  

  constructor(public authService:AuthService, private router: Router,private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      name: [ '',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });

  }
  get email(){
    return this.registerForm.get('email')
  }

  register(){
    
    if(this.registerForm.get('password').value!= this.registerForm.get('confirmPassword').value)
    {
      alert("Password does not match !")
    }
    else{
    
    this.authService.signUp(this.registerForm.value).subscribe((res:any)=>{
      if (!res.status) alert(res.message)
      else{
        this.router.navigate(['/login'])
      }
    })
  }
}

}

