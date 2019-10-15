import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,DocumentReference } from '@angular/fire/firestore'; 
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Movie {
  id?:string,
  name:string,
  description:string
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies:Observable<Movie[]>;
  private movieCollection:AngularFirestoreCollection<Movie>;

  constructor(private afs:AngularFirestore) { 
    this.movieCollection = this.afs.collection<Movie>('movies');
    this.movies = this.movieCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id,...data };
        });
      })
    );
  }
  getMovies():Observable<Movie[]> {
    return this.movies;
  }
  getMovie(id:string):Observable<Movie>{
    return this.movieCollection.doc<Movie>(id).valueChanges().pipe(
      take(1),
      map(movie => {
        movie.id = id;
        return movie;
      })
    );
  }
  addMovie(movie:Movie):Promise<DocumentReference>{
    return this.movieCollection.add(movie);
  }
  updateMovie(movie:Movie):Promise<void>{
    return this.movieCollection.doc(movie.id).update({ name:movie.name,description:movie.description});
  }
  deleteMovie(id:string):Promise<void>{
    return this.movieCollection.doc(id).delete();
  }
}
