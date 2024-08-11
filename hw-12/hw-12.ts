interface Movie {
  title: string;
  releaseYear: number;
  rating: number;
  awards: string[];
}

interface Category {
  name: string;
  movies: Movie[];
}

interface MatchFilter {
  filter: string;
}

interface RangeFilter {
  filter: number;
  filterTo: number;
}

interface ValueFilter {
  values: string[];
}

interface MovieFilters {
  title?: MatchFilter;
  releaseYear?: RangeFilter;
  rating?: RangeFilter;
  awards?: ValueFilter;
}

interface CategoryFilters {
  name?: MatchFilter;
  movies?: MovieFilters;
}

class MovieList {
  private movies: Movie[];
  private filters: MovieFilters;

  constructor(movies: Movie[]) {
    this.movies = movies;
    this.filters = {};
  }

  applyFilters(filters: MovieFilters) {
    this.filters = filters;
    this.filterMovies();
  }

  applySearchValue(filter: MatchFilter) {
    this.filters.title = filter;
    this.filterMovies();
  }

  private filterMovies() {
    let filteredMovies = this.movies;

    if (this.filters.title) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.includes(this.filters.title!.filter)
      );
    }

    if (this.filters.releaseYear) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.releaseYear >= this.filters.releaseYear!.filter &&
        movie.releaseYear <= this.filters.releaseYear!.filterTo
      );
    }

    if (this.filters.rating) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.rating >= this.filters.rating!.filter &&
        movie.rating <= this.filters.rating!.filterTo
      );
    }

    if (this.filters.awards) {
      filteredMovies = filteredMovies.filter(movie =>
        this.filters.awards!.values.some(award => movie.awards.includes(award))
      );
    }

    this.movies = filteredMovies;
  }

  getFilteredMovies(): Movie[] {
    return this.movies;
  }
}

class CategoryList {
  private categories: Category[];
  private filters: CategoryFilters;

  constructor(categories: Category[]) {
    this.categories = categories;
    this.filters = {};
  }

  applyFilters(filters: CategoryFilters) {
    this.filters = filters;
    this.filterCategories();
  }

  applySearchValue(filter: MatchFilter) {
    this.filters.name = filter;
    this.filterCategories();
  }

  private filterCategories() {
    let filteredCategories = this.categories;

    if (this.filters.name) {
      filteredCategories = filteredCategories.filter(category =>
        category.name.includes(this.filters.name!.filter)
      );
    }

    if (this.filters.movies) {
      filteredCategories = filteredCategories.map(category => {
        const movieList = new MovieList(category.movies);
        movieList.applyFilters(this.filters.movies!);
        return { ...category, movies: movieList.getFilteredMovies() };
      }).filter(category => category.movies.length > 0);
    }

    this.categories = filteredCategories;
  }

  getFilteredCategories(): Category[] {
    return this.categories;
  }
}