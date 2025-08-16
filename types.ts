export interface Word {
  hebrew: string;
  transliteration: string;
  meaning: string;
}

export interface Person extends Word {
  gender: 'male' | 'female';
}

export interface Verb {
  male: string;
  female: string;
  meaning: string;
}

export enum Category {
  Places = 'places',
  People = 'people',
  Sentences = 'sentences',
}
