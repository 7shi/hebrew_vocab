
import { VerbType } from "./types.ts";
import type { Person, Verb, Place } from "./types.ts";

export const PLACES: Place[] = [
  { 
    hebrew: "אוּר", 
    transliteration: "Ur", 
    meaning: "Ur", 
    be: "בְּאוּר", 
    transliteration_be: "be'Ur", 
    le: "לְאוּר", 
    transliteration_le: "le'Ur" 
  },
  { 
    hebrew: "יְרִיחוֹ", 
    transliteration: "Yericho", 
    meaning: "Jericho", 
    be: "בִּירִיחוֹ", 
    transliteration_be: "biRicho", 
    le: "לִירִיחוֹ", 
    transliteration_le: "liRicho" 
  },
  { 
    hebrew: "יְרוּשָׁלַיִם", 
    transliteration: "Yerushalayim", 
    meaning: "Jerusalem", 
    be: "בִּירוּשָׁלַיִם", 
    transliteration_be: "biRushalayim", 
    le: "לִירוּשָׁלַיִם", 
    transliteration_le: "liRushalayim" 
  },
  { 
    hebrew: "חֶבְרוֹן", 
    transliteration: "Chevron", 
    meaning: "Hebron", 
    be: "בְּחֶבְרוֹן", 
    transliteration_be: "beChevron", 
    le: "לְחֶבְרוֹן", 
    transliteration_le: "leChevron" 
  },
  { 
    hebrew: "בָּבֶל", 
    transliteration: "Bavel", 
    meaning: "Babylon", 
    be: "בְּבָבֶל", 
    transliteration_be: "beVavel", 
    le: "לְבָבֶל", 
    transliteration_le: "leVavel" 
  },
  { 
    hebrew: "נִינְוֵה", 
    transliteration: "Ninveh", 
    meaning: "Nineveh", 
    be: "בְּנִינְוֵה", 
    transliteration_be: "beNinveh", 
    le: "לְנִינְוֵה", 
    transliteration_le: "leNinveh" 
  },
  { 
    hebrew: "שְׁכֶם", 
    transliteration: "Shechem", 
    meaning: "Shechem", 
    be: "בִּשְׁכֶם", 
    transliteration_be: "biShchem", 
    le: "לִשְׁכֶם", 
    transliteration_le: "liShchem" 
  },
  { 
    hebrew: "בֵּית אֵל", 
    transliteration: "Beit El", 
    meaning: "Bethel", 
    be: "בְּבֵית אֵל", 
    transliteration_be: "beVeit El", 
    le: "לְבֵית אֵל", 
    transliteration_le: "leVeit El" 
  },
  { 
    hebrew: "דַּמֶּשֶׂק", 
    transliteration: "Damesek", 
    meaning: "Damascus", 
    be: "בְּדַמֶּשֶׂק", 
    transliteration_be: "beDamesek", 
    le: "לְדַמֶּשֶׂק", 
    transliteration_le: "leDamesek" 
  },
  { 
    hebrew: "גֶּזֶר", 
    transliteration: "Gezer", 
    meaning: "Gezer", 
    be: "בְּגֶזֶר", 
    transliteration_be: "beGezer", 
    le: "לְגֶזֶר", 
    transliteration_le: "leGezer" 
  }
];

export const PEOPLE: Person[] = [
  { hebrew: "אָדָם", transliteration: "Adam", meaning: "Adam", gender: "male" },
  { hebrew: "חַוָּה", transliteration: "Chavah", meaning: "Eve", gender: "female" },
  { hebrew: "נֹחַ", transliteration: "Noach", meaning: "Noah", gender: "male" },
  { hebrew: "אַבְרָהָם", transliteration: "Avraham", meaning: "Abraham", gender: "male" },
  { hebrew: "שָׂרָה", transliteration: "Sarah", meaning: "Sarah", gender: "female" },
  { hebrew: "יִצְחָק", transliteration: "Yitzhak", meaning: "Isaac", gender: "male" },
  { hebrew: "רִבְקָה", transliteration: "Rivka", meaning: "Rebekah", gender: "female" },
  { hebrew: "יַעֲקֹב", transliteration: "Yaakov", meaning: "Jacob", gender: "male" },
  { hebrew: "רָחֵל", transliteration: "Rachel", meaning: "Rachel", gender: "female" },
  { hebrew: "לֵאָה", transliteration: "Leah", meaning: "Leah", gender: "female" },
  { hebrew: "יוֹסֵף", transliteration: "Yosef", meaning: "Joseph", gender: "male" },
  { hebrew: "מֹשֶׁה", transliteration: "Moshe", meaning: "Moses", gender: "male" },
  { hebrew: "יְהוֹשֻׁעַ", transliteration: "Yehoshua", meaning: "Joshua", gender: "male" },
  { hebrew: "שְׁמוּאֵל", transliteration: "Shmu'el", meaning: "Samuel", gender: "male" },
  { hebrew: "רוּת", transliteration: "Rut", meaning: "Ruth", gender: "female" },
  { hebrew: "שָׁאוּל", transliteration: "Sha'ul", meaning: "Saul", gender: "male" },
  { hebrew: "דָּוִד", transliteration: "David", meaning: "David", gender: "male" },
  { hebrew: "שְׁלֹמֹה", transliteration: "Shlomo", meaning: "Solomon", gender: "male" },
  { hebrew: "יְשַׁעְיָהוּ", transliteration: "Yeshayahu", meaning: "Isaiah", gender: "male" },
  { hebrew: "יִרְמְיָהוּ", transliteration: "Yirmiyahu", meaning: "Jeremiah", gender: "male" },
  { hebrew: "יְחֶזְקֵאל", transliteration: "Yechezkel", meaning: "Ezekiel", gender: "male" }
];

export const MEN: Person[] = PEOPLE.filter(p => p.gender === 'male');
export const WOMEN: Person[] = PEOPLE.filter(p => p.gender === 'female');

export const VERBS: Verb[] = [
    { 
      type: VerbType.Intransitive, 
      male: "יָשַׁן", transliteration_male: "yashan", 
      female: "יָשְׁנָה", transliteration_female: "yashna", 
      meaning: "slept",
    },
    { 
      type: VerbType.Transitive, 
      male: "אָהַב", transliteration_male: "ahav", 
      female: "אָהֲבָה", transliteration_female: "ahava", 
      meaning: "loved",
    },
    { 
      type: VerbType.Existence, 
      male: "הָיָה", transliteration_male: "hayah", 
      female: "הָיְתָה", transliteration_female: "hayta", 
      meaning: "was in",
    },
    { 
      type: VerbType.Movement, 
      male: "הָלַךְ", transliteration_male: "halakh", 
      female: "הָלְכָה", transliteration_female: "halkha", 
      meaning: "went to",
    }
];
