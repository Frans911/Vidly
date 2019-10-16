import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular'; 
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit { 
  email:string;
  password:string;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  SignIn(){
    // firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    //   console.log(errorMessage);
    //}); 
  }
}
