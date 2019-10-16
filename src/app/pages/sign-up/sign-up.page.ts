import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email:string;
  password:string;
  name:string;
  contacts:string;
  constructor(private afAuth:AngularFireAuth) { }

  ngOnInit() {
  }
  SignUp(){
   const user =  this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password);
   console.log(user)
  }
}
