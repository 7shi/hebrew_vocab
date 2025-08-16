import type { Word, Person, Verb } from "./types.ts";

export const PLACES: Word[] = [
  { hebrew: "יְרוּשָׁלַיִם", transliteration: "Yerushalayim", meaning: "Jerusalem" },
  { hebrew: "חֶבְרוֹן", transliteration: "Chevron", meaning: "Hebron" },
  { hebrew: "בְּאֵר שֶׁבַע", transliteration: "Be'er Sheva", meaning: "Beersheba" },
  { hebrew: "יְרִיחוֹ", transliteration: "Yericho", meaning: "Jericho" },
  { hebrew: "בֵּית אֵל", transliteration: "Beit El", meaning: "Bethel" },
  { hebrew: "שְׁכֶם", transliteration: "Shechem", meaning: "Shechem" },
  { hebrew: "שִׁלֹה", transliteration: "Shiloh", meaning: "Shiloh" },
  { hebrew: "בֵּית לֶחֶם", transliteration: "Beit Lechem", meaning: "Bethlehem" },
  { hebrew: "עַזָּה", transliteration: "Azzah", meaning: "Gaza" },
  { hebrew: "הַנֶּגֶב", transliteration: "HaNegev", meaning: "The Negev" }
];

export const PEOPLE: Person[] = [
  { hebrew: "אַבְרָהָם", transliteration: "Avraham", meaning: "Abraham", gender: "male" },
  { hebrew: "שָׂרָה", transliteration: "Sarah", meaning: "Sarah", gender: "female" },
  { hebrew: "מֹשֶׁה", transliteration: "Moshe", meaning: "Moses", gender: "male" },
  { hebrew: "דָּוִד", transliteration: "David", meaning: "David", gender: "male" },
  { hebrew: "שְׁלֹמֹה", transliteration: "Shlomo", meaning: "Solomon", gender: "male" },
  { hebrew: "רָחֵל", transliteration: "Rachel", meaning: "Rachel", gender: "female" },
  { hebrew: "יִצְחָק", transliteration: "Yitzhak", meaning: "Isaac", gender: "male" },
  { hebrew: "יַעֲקֹב", transliteration: "Yaakov", meaning: "Jacob", gender: "male" },
  { hebrew: "רִבְקָה", transliteration: "Rivka", meaning: "Rebecca", gender: "female" },
  { hebrew: "לֵאָה", transliteration: "Leah", meaning: "Leah", gender: "female" }
];

export const VERBS: Verb[] = [
    { male: "אָהַב", transliteration_male: "ahav", female: "אָהֲבָה", transliteration_female: "ahava", meaning: "loved" },
    { male: "פָּקַד", transliteration_male: "pakad", female: "פָּקְדָה", transliteration_female: "pakda", meaning: "visited" },
    { male: "רָאָה", transliteration_male: "ra'a", female: "רָאֲתָה", transliteration_female: "ra'ata", meaning: "saw" },
    { male: "יָדַע", transliteration_male: "yada", female: "יָדְעָה", transliteration_female: "yad'a", meaning: "knew" }
];
