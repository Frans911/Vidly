import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular'; 
import { AngularFireAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit { 
  email:string;
  password:string;
  constructor(private navCtrl: NavController,private afAuth:AngularFireAuth,private router: Router,
    private toastCtrl:ToastController) { }

  ngOnInit() {
  }
  SignIn(){ 
    if (this.email === undefined || this.password === undefined) {
      this.showToast('Enter correct credentials');
    }
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(user =>{
      console.log(user) 
      this.router.navigateByUrl('/movie');
      this.showToast('Successfully sign in');
    }).catch(error => {  
      this.showToast('Enter correct credentials');
      console.log(error)
    });
  }
  
  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present())
  }
}
