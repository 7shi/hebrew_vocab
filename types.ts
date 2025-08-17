export interface Word {
  hebrew: string;
  transliteration: string;
  meaning: string;
}

export interface Place extends Word {
  be: string;
  transliteration_be: string;
  le: string;
  transliteration_le: string;
}

export interface Person extends Word {
  gender: 'male' | 'female';
}

export enum VerbType {
  Intransitive = 'intransitive',
  Transitive = 'transitive',
  Existence = 'existence',
  Movement = 'movement',
}

export interface Verb {
  type: VerbType;
  male: string;
  transliteration_male: string;
  female: string;
  transliteration_female: string;
  meaning: string;
  preposition?: string;
  hebrew_preposition?: 'be' | 'le';
}

export enum Category {
  Places = 'places',
  PeopleAll = 'people_all',
  PeopleMale = 'people_male',
  PeopleFemale = 'people_female',
  Verbs = 'verbs',
  Sentences = 'sentences',
}
