import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieService } from 'src/app/services/movie.service';
  
import { Router } from '@angular/router'; 
import { ToastController } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';  
import { DescriptionPage } from 'src/app/components/description/description.page';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  private movies:Observable<Movie[]>; 
  description:string;
  constructor(private movieService:MovieService,private toastCtrl:ToastController,
    private router: Router,public popoverController: PopoverController) { }

  ngOnInit() {
    this.movies = this.movieService.getMovies(); 
  }
  deleteMovie(id:string){
    this.movieService.deleteMovie(id).then(() => {
      this.router.navigateByUrl('/movie');
      this.showToast('Movie successfully deleted');
    },err => {
      this.showToast('Movie was not added....');
    })
  }
  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present())
  }
  async presentPopover(ev: any,description:string) {
    const popover = await this.popoverController.create({
      component: DescriptionPage,
      componentProps:{
        description:description
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
