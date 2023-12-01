import { Movie } from "./movies";


//AQUEST ARXIU MOSTRA L'ARRAY DE PEL-LÍCULES MITJANÇANT RESULTS
export interface ArrayResponse {

  results: Movie[];
  total_pages: number;
  total_results: number;
}