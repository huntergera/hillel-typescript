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

  private filterMovies() {}

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

  private filterCategories() {}

  getFilteredCategories(): Category[] {
    return this.categories;
  }
}