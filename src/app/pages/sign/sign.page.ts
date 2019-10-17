import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular'; 
import { AngularFireAuth} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { LinkedIn } from "ng2-cordova-oauth/core";
import { AlertController, LoadingController, Platform } from "@ionic/angular";
import { OauthCordova } from "ng2-cordova-oauth/platform/cordova";
import { environment } from "src/environments/environment";
import { LinkedinService } from "../../services/linkedin.service";  


@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit { 
  private loading: any;
  email:string;
  password:string;
  constructor(private navCtrl: NavController,private afAuth:AngularFireAuth,private router: Router,
    private toastCtrl:ToastController,
    private alertController: AlertController,
    private linkedinService: LinkedinService,
    private loadingController: LoadingController,
    private platform: Platform, ) { }

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
  linkedInLogin() {
    this.presentLoading();
    const provider = new LinkedIn({
        clientId: environment.linkedinClientId,
        appScope: ["r_emailaddress", "r_liteprofile"],
        redirectUri: "http://localhost/callback",
        responseType: "code",
        state: this.linkedinService.getRandomState()
    });
    const oauth = new OauthCordova();

    this.platform.ready().then(() => {
        oauth
            .logInVia(provider)
            .then(success => {
                this.linkedinService
                    .getAccessToken(success["code"])
                    .then(data => {
                        const parsedResponse = JSON.parse(data.data);
                        const accessToken = parsedResponse.access_token;

                        const namePromise = this.linkedinService.getName(
                            accessToken
                        );
                        const picPromise = this.linkedinService.getProfilePic(
                            accessToken
                        );
                        const emailPromise = this.linkedinService.getEmail(
                            accessToken
                        );

                        Promise.all([namePromise, picPromise, emailPromise])
                            .then(results => {
                                const name = results[0];
                                const pic = results[1];
                                const email = results[2];

                                console.log(name, email, pic);
                            })
                            .catch(err => {
                                this.loading.dismiss();
                                this.showAlert(
                                    "Error",
                                    "Something went wrong"
                                );
                            });
                    })
                    .catch(err => {
                        this.loading.dismiss();
                        console.error(err);
                        this.showAlert("Error", "Something went wrong");
                    });
            })
            .catch(err => {
                this.loading.dismiss();
                console.error(err);
                this.showAlert("Error", "Something went wrong");
            });
    });
}
  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present())
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: "Loading"
    });
    await this.loading.present();
}
async showAlert(title: string, msg: string) {
  const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"]
  });

  await alert.present();
}

}
