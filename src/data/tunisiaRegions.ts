/**
 * Tunisia administrative divisions: Gouvernorats → Délégations (Villes)
 * Used for the diagnostic form Gouvernorat → Ville cascading filter.
 */

export interface GouvernoratData {
  name: string;
  villes: string[];
}

export const tunisiaRegions: GouvernoratData[] = [
  {
    name: "Ariana",
    villes: [
      "Ariana Ville", "Ettadhamen", "Kalâat el-Andalous", "La Soukra",
      "Mnihla", "Raoued", "Sidi Thabet",
    ],
  },
  {
    name: "Béja",
    villes: [
      "Béja Nord", "Béja Sud", "Amdoun", "Goubellat",
      "Medjez el-Bab", "Nefza", "Téboursouk", "Testour", "Thibar",
    ],
  },
  {
    name: "Ben Arous",
    villes: [
      "Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra",
      "Fouchana", "Hammam Chott", "Hammam Lif", "Medina Jedida",
      "Megrine", "Mohamedia", "Mornag", "Radès",
    ],
  },
  {
    name: "Bizerte",
    villes: [
      "Bizerte Nord", "Bizerte Sud", "El Alia", "Ghar El Melh",
      "Ghezala", "Joumine", "Mateur", "Menzel Bourguiba",
      "Menzel Jemil", "Ras Jebel", "Sejnane", "Tinja", "Utique", "Zarzouna",
    ],
  },
  {
    name: "Gabès",
    villes: [
      "Gabès Médina", "Gabès Ouest", "Gabès Sud", "El Hamma",
      "Ghannouch", "Mareth", "Matmata", "Nouvelle Matmata",
      "Menzel El Habib", "Métouia",
    ],
  },
  {
    name: "Gafsa",
    villes: [
      "Gafsa Nord", "Gafsa Sud", "Belkhir", "El Guettar",
      "El Ksar", "Mdhilla", "Métlaoui", "Moularès",
      "Redeyef", "Sened", "Sidi Aïch",
    ],
  },
  {
    name: "Jendouba",
    villes: [
      "Jendouba", "Jendouba Nord", "Aïn Draham", "Balta-Bou Aouane",
      "Bou Salem", "Fernana", "Ghardimaou", "Oued Melliz", "Tabarka",
    ],
  },
  {
    name: "Kairouan",
    villes: [
      "Kairouan Nord", "Kairouan Sud", "Bou Hajla", "Chebika",
      "Echrarda", "Haffouz", "Hajeb El Ayoun", "Nasrallah",
      "Oueslatia", "Sbikha", "El Alâa",
    ],
  },
  {
    name: "Kasserine",
    villes: [
      "Kasserine Nord", "Kasserine Sud", "Ezzouhour", "Feriana",
      "Foussana", "Haïdra", "Hassi El Ferid", "Jedelienne",
      "Majel Bel Abbès", "Sbeitla", "Sbiba", "Thala",
    ],
  },
  {
    name: "Kébili",
    villes: [
      "Kébili Nord", "Kébili Sud", "Douz Nord", "Douz Sud",
      "Faouar", "Souk Lahad",
    ],
  },
  {
    name: "Kef",
    villes: [
      "Le Kef Est", "Le Kef Ouest", "Dahmani", "El Ksour",
      "Jérissa", "Kalâat Khasba", "Kalâat Senane", "Nebeur",
      "Sakiet Sidi Youssef", "Sers", "Tajerouine",
    ],
  },
  {
    name: "Mahdia",
    villes: [
      "Mahdia", "Bou Merdes", "Chebba", "Chorbane",
      "El Jem", "Essouassi", "Hebira", "Ksour Essef",
      "Melloulèche", "Ouled Chamekh", "Sidi Alouane",
    ],
  },
  {
    name: "Manouba",
    villes: [
      "Manouba", "Borj El Amri", "Djedeida", "Douar Hicher",
      "El Battan", "Mornaguia", "Oued Ellil", "Tebourba",
    ],
  },
  {
    name: "Médenine",
    villes: [
      "Médenine Nord", "Médenine Sud", "Ben Gardane", "Beni Khedache",
      "Djerba Ajim", "Djerba Houmt Souk", "Djerba Midoun", "Sidi Makhlouf", "Zarzis",
    ],
  },
  {
    name: "Monastir",
    villes: [
      "Monastir", "Bekalta", "Bembla", "Beni Hassen",
      "Jammel", "Ksar Hellal", "Ksibet el-Médiouni", "Moknine",
      "Ouerdanine", "Sahline", "Sayada-Lamta-Bou Hajar",
      "Téboulba", "Zéramdine",
    ],
  },
  {
    name: "Nabeul",
    villes: [
      "Nabeul", "Béni Khalled", "Béni Khiar", "Bou Argoub",
      "Dar Chaâbane El Fehri", "El Haouaria", "Grombalia",
      "Hammam Ghezèze", "Hammamet", "Kélibia", "Korba",
      "Menzel Bouzelfa", "Menzel Temime", "Soliman", "Takelsa",
    ],
  },
  {
    name: "Sfax",
    villes: [
      "Sfax Ville", "Sfax Ouest", "Sfax Sud", "Agareb",
      "Bir Ali Ben Khalifa", "El Amra", "El Hencha", "Ghraiba",
      "Jebiniana", "Kerkennah", "Mahrès", "Menzel Chaker",
      "Sakiet Eddaïer", "Sakiet Ezzit", "Skhira", "Thyna",
    ],
  },
  {
    name: "Sidi Bouzid",
    villes: [
      "Sidi Bouzid Est", "Sidi Bouzid Ouest", "Bir El Hafey",
      "Cebbala Ouled Asker", "Jelma", "Jilma", "Maknassy",
      "Menzel Bouzaïenne", "Mezouna", "Ouled Haffouz",
      "Regueb", "Sidi Ali Ben Aoun",
    ],
  },
  {
    name: "Siliana",
    villes: [
      "Siliana Nord", "Siliana Sud", "Bargou", "Bou Arada",
      "El Aroussa", "El Krib", "Gaâfour", "Kesra",
      "Le Sers", "Makthar", "Rouhia",
    ],
  },
  {
    name: "Sousse",
    villes: [
      "Sousse Médina", "Sousse Riadh", "Sousse Jawhara", "Sousse Sidi Abdelhamid",
      "Akouda", "Bouficha", "Enfida", "Hammam Sousse",
      "Hergla", "Kalâa Kebira", "Kalâa Sghira",
      "Kondar", "M'saken", "Sidi Bou Ali", "Sidi El Hani",
    ],
  },
  {
    name: "Tataouine",
    villes: [
      "Tataouine Nord", "Tataouine Sud", "Bir Lahmar",
      "Dehiba", "Ghomrassen", "Remada", "Smar",
    ],
  },
  {
    name: "Tozeur",
    villes: [
      "Tozeur", "Degache", "Hazoua", "Nefta", "Tameghza",
    ],
  },
  {
    name: "Tunis",
    villes: [
      "Bab El Bhar", "Bab Souika", "Carthage", "Cité El Khadra",
      "Djebel Jelloud", "El Hrairia", "El Kabaria", "El Menzah",
      "El Omrane", "El Omrane Supérieur", "El Ouardia",
      "Ettahrir", "Ezzouhour", "La Goulette", "La Marsa",
      "Le Bardo", "Le Kram", "Médina", "Séjoumi",
      "Sidi El Béchir", "Sidi Hassine",
    ],
  },
  {
    name: "Zaghouan",
    villes: [
      "Zaghouan", "Bir Mcherga", "El Fahs", "Nadhour",
      "Saouaf", "Zriba",
    ],
  },
];

/**
 * Get the list of gouvernorat names.
 */
export function getGouvernoratNames(): string[] {
  return tunisiaRegions.map((g) => g.name);
}

/**
 * Get the villes for a given gouvernorat.
 */
export function getVillesForGouvernorat(gouvernorat: string): string[] {
  const found = tunisiaRegions.find((g) => g.name === gouvernorat);
  return found ? found.villes : [];
}
