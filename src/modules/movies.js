import { addCommentPopupEvent } from './comments.js';
// import {displayDetails} from './comments.js';
import HelperFuncs from './helpers.js';

class Movies {
  constructor() {
    this.API_BASE_URL = 'https://api.tvmaze.com/';
    this.LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/j7QTZEiQOHqTqkmNaozR/likes/';
    this.movies = [];
    this.likes = [];
  }

  addLike = async (itemId, likeButton) => {
    await fetch(this.LIKES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: itemId }),
    }).then((response) => response.text(response)).then((json) => json);
    await this.getLikes();
    const index = this.likes.findIndex((like) => like.item_id === itemId);
    const msgLikes = index >= 0 ? this.likes[index].likes : 0;
    likeButton.nextElementSibling.innerHTML = msgLikes;
  }

  getMoviesCount = () => this.movies.length;

  getLikes = async () => {
    this.likes = await fetch(this.LIKES_URL).then((response) => response.json());
  }

  getMoviesCount = () => this.movies.length;

      getMovieList = async (key) => {
        const Query = `search/shows?q=${key}`;
        const list = await fetch(`${this.API_BASE_URL}${Query}`).then((response) => response.json());
        this.movies = [...this.movies, ...list];
      }

      displayMovies = async () => {
        await this.getMovieList('birds');
        await this.getMovieList('boys');
        await this.getLikes();
        const list = this.movies.reduce((prev, curr) => {
          if (curr.show.image) {
            const index = this.likes.findIndex((like) => like.item_id === curr.show.id);
            const msgLikes = index >= 0 ? this.likes[index].likes : 0;
            prev += `
            <div class="movie-item mb-1">
              <div>
                <div class="d-flex space-around mb-1">
                 <img src=${curr.show.image.medium} />
                </div>
                <div class="d-flex movie-content mb-1 space-evenly">
                  <span>${curr.show.name}</span>
                  <div>
                  <i class="fa fa-heart fa-lg" data-pos=${curr.show.id}></i>  
                <span>${msgLikes}</span> Likes
               </div>
              </div>
              <div class="d-flex space-around mb-1">
                <button class="btn" id="${curr.show.id}">Comments</button>
              </div>
            </div>
            </div>

            `;
          }
          return prev;
        }, '');
        document.querySelector('.movies-list').innerHTML = list;
        addCommentPopupEvent();
        HelperFuncs.registersLikeButtons(this);
      };
}

export default Movies;