import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // email :string="";
  // password :string="";
  loginForm:FormGroup |any

  constructor(public authService:AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
     
    });

  }

  login(){
    // let auth = {
    //   email:this.email,
    //   password: this.password
    // }
    this.authService.signIn(this.loginForm.value).subscribe((res:any)=>{
      if (!res.status) alert(res.message)
      else{
        this.authService.id = res.id;
        this.authService.name=res.name;
        this.router.navigate(['/chat'])
       //alert(res.message)
      }
    });
  }

}
