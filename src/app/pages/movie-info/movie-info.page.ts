import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie } from 'src/app/services/movie.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.page.html',
  styleUrls: ['./movie-info.page.scss'],
})
export class MovieInfoPage implements OnInit { 

  movie: Movie = {
    name:'',
    description:''
  }

  constructor(private activatedRoute:ActivatedRoute,private movieService:MovieService,
    private toastCtrl:ToastController,private router: Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      })
    }
  }
  addMovie(){
    this.movieService.addMovie(this.movie).then(()=>{
      this.router.navigateByUrl('/movie');
      this.showToast('Movie successfully added');
    },err => {
      this.showToast('Movie was not added....');
    });
  }
  deleteMovie(){
    this.movieService.deleteMovie(this.movie.id).then(() => {
      this.router.navigateByUrl('/movie');
      this.showToast('Movie successfully deleted');
    },err => {
      this.showToast('Movie was not added....');
    })
  }
  updateMovie(){
    this.movieService.updateMovie(this.movie).then(() => { 
      this.router.navigateByUrl('/movie');
      this.showToast('Movie successfully updated');
    },err => {
      this.showToast('Movie was not successfully updated....');
    })
  }
  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present())
  }

}
