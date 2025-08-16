import type { Word, Person, Verb } from "./types.ts";

export const PLACES: Word[] = [
  { hebrew: "אוּר", transliteration: "Ur", meaning: "Ur" },
  { hebrew: "יְרִיחוֹ", transliteration: "Yericho", meaning: "Jericho" },
  { hebrew: "יְרוּשָׁלַיִם", transliteration: "Yerushalayim", meaning: "Jerusalem" },
  { hebrew: "חֶבְרוֹן", transliteration: "Chevron", meaning: "Hebron" },
  { hebrew: "בָּבֶל", transliteration: "Bavel", meaning: "Babylon" },
  { hebrew: "נִינְוֵה", transliteration: "Ninveh", meaning: "Nineveh" },
  { hebrew: "שְׁכֶם", transliteration: "Shechem", meaning: "Shechem" },
  { hebrew: "בֵּית אֵל", transliteration: "Beit El", meaning: "Bethel" },
  { hebrew: "דַּמֶּשֶׂק", transliteration: "Damesek", meaning: "Damascus" },
  { hebrew: "גֶּזֶר", transliteration: "Gezer", meaning: "Gezer" }
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

export const VERBS: Verb[] = [
    { male: "אָהַב", transliteration_male: "ahav", female: "אָהֲבָה", transliteration_female: "ahava", meaning: "loved" },
    { male: "פָּקַד", transliteration_male: "pakad", female: "פָּקְדָה", transliteration_female: "pakda", meaning: "visited" },
    { male: "רָאָה", transliteration_male: "ra'a", female: "רָאֲתָה", transliteration_female: "ra'ata", meaning: "saw" },
    { male: "יָדַע", transliteration_male: "yada", female: "יָדְעָה", transliteration_female: "yad'a", meaning: "knew" }
];