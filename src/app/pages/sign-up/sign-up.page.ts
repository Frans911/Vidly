import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 

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
  constructor(private afAuth:AngularFireAuth,private router: Router,private toastCtrl:ToastController) { }

  ngOnInit() {
  }
  SignUp(){
    if (this.email === undefined || this.password === undefined) {
      this.showToast('Fill in correct details');
    }
   const user =  this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then(user =>{
    console.log(user) 
    this.router.navigateByUrl('/sign');
    this.showToast('Successfully sign up');
  }).catch(error => {  
    console.log(error)
    this.showToast('Fill in correct details');
  }); 

  }
  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present())
  }
}
