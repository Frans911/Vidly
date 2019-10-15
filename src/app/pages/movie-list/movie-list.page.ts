import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  private movies:Observable<Movie[]>;

  constructor(private movieService:MovieService) { }

  ngOnInit() {
    this.movies = this.movieService.getMovies();
  }

}
