export interface Book {
  id: string;
  number: number;
  title?: string;
  originalTitle: string;
  releaseDate?: string;
  releaseDateStr?: string;
  description?: string;
  pages?: number;
  cover?: string;
}
