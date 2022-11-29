class Movies {
    constructor() {
      this.API_BASE_URL = 'https://api.tvmaze.com/';
      this.movies = [];
    }
  
      getMovieList = async (key) => {
        const Query = `search/shows?q=${key}`;
        const list = await fetch(`${this.API_BASE_URL}${Query}`).then((response) => response.json());
        this.movies = [...this.movies, ...list];
      }
  
      displayMovies = async () => {
        await this.getMovieList('birds');
        await this.getMovieList('boys');
        await this.getMovieList('empire');
  
        const list = this.movies.reduce((prev, curr) => {
          if (curr.show.image) {
            prev += `
            <div class="movie-item mb-1">
              <div>
                <div class="d-flex space-around mb-1">
                 <img src=${curr.show.image.medium} />
                </div>
                <div class="d-flex movie-content mb-1 space-evenly">
                  <span>${curr.show.name}</span>
                  <span> <i class="fa fa-heart" data-id=${curr.show.id}></i> 0 Likes</span>
                </div>
                <div class="d-flex space-around mb-1">
                  <button class="btn" data-id=${curr.show.id}>Comments</button>
                </div>
              </div>
            </div>
            `;
          }
          return prev;
        }, '');
        document.querySelector('.movies-list').innerHTML = list;
      }
  }
  
  export default Movies;