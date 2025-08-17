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
  VerbsBoth = 'verbs_both',
  VerbsMale = 'verbs_male',
  VerbsFemale = 'verbs_female',
  
  // Sentence Categories
  SentencesAllBoth = 'sentences_all_both',
  SentencesAllMasculine = 'sentences_all_masculine',
  SentencesAllFeminine = 'sentences_all_feminine',
  
  SentencesSleptBoth = 'sentences_slept_both',
  SentencesSleptMasculine = 'sentences_slept_masculine',
  SentencesSleptFeminine = 'sentences_slept_feminine',
  
  SentencesLovedBoth = 'sentences_loved_both',
  SentencesLovedMasculine = 'sentences_loved_masculine',
  SentencesLovedFeminine = 'sentences_loved_feminine',
  
  SentencesWasBoth = 'sentences_was_both',
  SentencesWasMasculine = 'sentences_was_masculine',
  SentencesWasFeminine = 'sentences_was_feminine',

  SentencesWentBoth = 'sentences_went_both',
  SentencesWentMasculine = 'sentences_went_masculine',
  SentencesWentFeminine = 'sentences_went_feminine',
}
