import { Component, OnInit,Input } from '@angular/core';



@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css'],
 
  
})
export class CardMovieComponent implements OnInit {


  //ES RELACIONA AMB <APP-CARD-MOVIE> DE SEARCH-MOVIE.COMPONENT.HTML
  @Input('movie') movie:any
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.movie);
    
  }

}
