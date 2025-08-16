
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
  transliteration_male: string;
  female: string;
  transliteration_female: string;
  meaning: string;
}

export enum Category {
  Places = 'places',
  Men = 'men',
  Women = 'women',
  Verbs = 'verbs',
  Sentences = 'sentences',
}
