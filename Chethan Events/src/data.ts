/* ------------------------------------------------------------------ */
/* Local client photographs                                            */
/* ------------------------------------------------------------------ */

// Files must be located in:
// public/pictures/picture 1.jpeg
// ...
// public/pictures/picture 29.jpeg

export const PICTURE_COUNT = 29;

// Existing Hero.tsx and App.tsx still contain these old image IDs.
// Resolve them to local client photos during the component updates.
const LEGACY_IMAGE_MAP: Record<number, number> = {
  34079355: 3,
  30198271: 4,
  14457430: 17,
  966861: 4,
  12087682: 7,
};

// The optional width argument is retained so existing img(id, width)
// calls continue working. Local files are served at their original size.
export const img = (id: number, _width = 900): string => {
  const pictureNumber = LEGACY_IMAGE_MAP[id] ?? id;

  if (
    !Number.isInteger(pictureNumber) ||
    pictureNumber < 1 ||
    pictureNumber > PICTURE_COUNT
  ) {
    throw new Error(`Unknown client picture number: ${id}`);
  }

  return `/pictures/picture%20${pictureNumber}.jpeg`;
};

// Named selections for the next component updates.
export const FEATURED_IMAGES = {
  hero: 3,
  heroLighting: 4,
  heroBirthday: 17,
  aboutMain: 7,
  aboutDetail: 13,
};

/* ------------------------------------------------------------------ */
/* Business details                                                    */
/* ------------------------------------------------------------------ */

export const BIZ = {
  name: "Chethan Events",

  handle: "@chethan_events__audio",
  instagram: "https://www.instagram.com/chethan_events__audio/",

  phones: [
    { display: "+91 82966 02176", raw: "918296602176" },
    { display: "+91 88671 85926", raw: "918867185926" },
  ],

  primaryWa: "918296602176",

  address: "T. Narasipura, Mysore",

  // Locality search only, not a verified business pin.
  maps:
    "https://www.google.com/maps/search/?api=1&query=T.+Narasipura,+Mysore",
  mapEmbed:
    "https://www.google.com/maps?q=T.%20Narasipura%2C%20Mysore&output=embed",

  // Unconfirmed details remain empty.
  email: "",
  hours: "",
  reference: "",
};

export const waLink = (msg: string, num = BIZ.primaryWa) =>
  `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

/* ------------------------------------------------------------------ */
/* Main service cards                                                  */
/* ------------------------------------------------------------------ */

export type ServiceId =
  | "birthday"
  | "wedding"
  | "babyshower"
  | "naming"
  | "lighting";

export interface Service {
  id: ServiceId;
  no: string;
  name: string;
  kannada: string;
  blurb: string;
  from: string;
  points: string[];
  images: number[];
  accent: string;

  // Optional context for components that display photo captions.
  imageNote?: string;
}

export const SERVICES: Service[] = [
  {
    id: "birthday",
    no: "01",
    name: "Birthday Decoration",
    kannada: "ಹುಟ್ಟುಹಬ್ಬ",
    blurb:
      "Birthday decoration and celebrations by Chethan Events. Share your date, venue and decoration ideas to discuss your requirements.",
    from: "",
    points: [
      "Birthday celebrations",
      "Anniversary celebrations",
      "Surprise events",
    ],
    images: [17, 19, 23, 29],
    accent: "#D2402F",
    imageNote: "Client-provided celebration photographs",
  },
  {
    id: "wedding",
    no: "02",
    name: "Wedding & Events",
    kannada: "ಮದುವೆ",
    blurb:
      "Wedding events, engagement decoration and haldi decor. Contact Chethan Events to discuss your celebration.",
    from: "",
    points: [
      "Wedding events",
      "Engagement decoration",
      "Haldi decor",
      "Bride-to-be celebrations",
      "Bachelorette parties",
    ],
    images: [3, 7, 13, 15],
    accent: "#F5A524",
    imageNote: "Client-provided stage decoration photographs",
  },
  {
    id: "babyshower",
    no: "03",
    name: "Baby Shower",
    kannada: "ಸೀಮಂತ",
    blurb:
      "Baby shower decoration for your family celebration. Share your event details and discuss decoration requirements with the team.",
    from: "",
    points: [
      "Baby shower decoration",
      "Discuss your decoration ideas",
      "Enquire about your date and venue",
    ],
    // General decoration examples; the event type is not confirmed.
    images: [9, 10, 14, 16],
    accent: "#15938A",
    imageNote:
      "General decoration examples; not identified as baby-shower events",
  },
  {
    id: "naming",
    no: "04",
    name: "Naming Ceremony",
    kannada: "ನಾಮಕರಣ",
    blurb:
      "Naming ceremony decoration by Chethan Events. Contact the team with your ceremony date, location and requirements.",
    from: "",
    points: [
      "Naming ceremony decoration",
      "Share your ceremony requirements",
      "Contact the team for enquiries",
    ],
    // General decoration examples; the event type is not confirmed.
    images: [8, 11, 12, 13],
    accent: "#FFC94A",
    imageNote:
      "General decoration examples; not identified as naming ceremonies",
  },
  {
    id: "lighting",
    no: "05",
    name: "Lighting & DJ Sound",
    kannada: "ದೀಪಾಲಂಕಾರ",
    blurb:
      "Lighting, DJ sound and festival lighting. Share your event and venue details to discuss the setup you need.",
    from: "",
    points: [
      "Event lighting",
      "DJ sound",
      "Festival lighting",
    ],
    images: [4, 3, 5, 16],
    accent: "#E0B36A",
    imageNote:
      "Client-provided illuminated decorations; no DJ equipment claim",
  },
];

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export interface Shot {
  id: number;
  cat: ServiceId;
  title: string;
  place: string;
  span?: boolean;
}

// IDs match the numbered filenames exactly.
// The wedding filter currently groups stage decorations.
// These broad visual groups do not establish the actual event type.
// Baby-shower and naming categories are left empty until identified.
export const GALLERY: Shot[] = [
  {
    id: 1,
    cat: "wedding",
    title: "Stage decoration 01",
    place: "",
  },
  {
    id: 2,
    cat: "wedding",
    title: "Stage decoration 02",
    place: "",
  },
  {
    id: 3,
    cat: "wedding",
    title: "Floral stage with curved backdrop",
    place: "",
    span: true,
  },
  {
    id: 4,
    cat: "lighting",
    title: "Illuminated entrance",
    place: "",
  },
  {
    id: 5,
    cat: "wedding",
    title: "Stage decoration 05",
    place: "",
  },
  {
    id: 6,
    cat: "wedding",
    title: "Stage decoration 06",
    place: "",
  },
  {
    id: 7,
    cat: "wedding",
    title: "Floral arch stage",
    place: "",
    span: true,
  },
  {
    id: 8,
    cat: "wedding",
    title: "Green backdrop decoration",
    place: "",
  },
  {
    id: 9,
    cat: "wedding",
    title: "Circular floral backdrop",
    place: "",
  },
  {
    id: 10,
    cat: "wedding",
    title: "Yellow and green backdrop",
    place: "",
  },
  {
    id: 11,
    cat: "wedding",
    title: "Stage decoration 11",
    place: "",
  },
  {
    id: 12,
    cat: "wedding",
    title: "Floral stage decoration",
    place: "",
  },
  {
    id: 13,
    cat: "wedding",
    title: "Green and cream stage",
    place: "",
  },
  {
    id: 14,
    cat: "wedding",
    title: "Blue backdrop decoration",
    place: "",
  },
  {
    id: 15,
    cat: "wedding",
    title: "Red and white stage",
    place: "",
  },
  {
    id: 16,
    cat: "lighting",
    title: "Colour-lit decorative backdrop",
    place: "",
  },
  {
    id: 17,
    cat: "birthday",
    title: "Pastel balloon celebration",
    place: "",
    span: true,
  },
  {
    id: 18,
    cat: "birthday",
    title: "Balloon ring decoration",
    place: "",
  },
  {
    id: 19,
    cat: "birthday",
    title: "Purple character-themed birthday",
    place: "",
  },
  {
    id: 20,
    cat: "birthday",
    title: "Butterfly-themed decoration",
    place: "",
  },
  {
    id: 21,
    cat: "birthday",
    title: "Purple and white birthday backdrop",
    place: "",
  },
  {
    id: 22,
    cat: "birthday",
    title: "Blue and white celebration setup",
    place: "",
  },
  {
    id: 23,
    cat: "birthday",
    title: "Black and gold birthday setup",
    place: "",
    span: true,
  },
  {
    id: 24,
    cat: "birthday",
    title: "Purple and gold balloon backdrop",
    place: "",
  },
  {
    id: 25,
    cat: "birthday",
    title: "Red and black birthday setup",
    place: "",
  },
  {
    id: 26,
    cat: "birthday",
    title: "Pastel birthday balloon ring",
    place: "",
  },
  {
    id: 27,
    cat: "birthday",
    title: "Colourful birthday backdrop",
    place: "",
  },
  {
    id: 28,
    cat: "birthday",
    title: "White and gold birthday setup",
    place: "",
  },
  {
    id: 29,
    cat: "birthday",
    title: "Pink character-themed birthday",
    place: "",
    span: true,
  },
];

/* ------------------------------------------------------------------ */
/* Scrolling service text                                              */
/* ------------------------------------------------------------------ */

export const TICKER = [
  "Wedding Events",
  "Birthday Celebrations",
  "Anniversaries",
  "Bride-to-Be",
  "Haldi Decor",
  "Bachelorette Parties",
  "Surprise Events",
  "Naming Ceremonies",
  "Engagement Decoration",
  "Baby Shower Decoration",
  "College Festivals",
  "Inaugurations & Launch Events",
  "DJ Sound",
  "Festival Lighting",
];

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export interface BusinessStat {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
}

export const STATS: BusinessStat[] = [];

/* ------------------------------------------------------------------ */
/* Enquiry guidance                                                    */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  {
    no: "01",
    title: "Share your event",
    text:
      "Tell the team which event you are planning and the service you need.",
  },
  {
    no: "02",
    title: "Send the details",
    text:
      "Share your preferred date, venue and decoration or sound and lighting requirements.",
  },
  {
    no: "03",
    title: "Discuss your enquiry",
    text:
      "Ask about availability, suitable options and pricing for your requirements.",
  },
  {
    no: "04",
    title: "Confirm with the team",
    text:
      "Confirm the agreed services, timing, charges and booking terms directly with Chethan Events.",
  },
];

/* ------------------------------------------------------------------ */
/* Confirmed offerings                                                 */
/* ------------------------------------------------------------------ */

export const THEMES = [
  "Wedding Events",
  "Birthday Decoration",
  "Anniversary Celebrations",
  "Bride-to-Be Celebrations",
  "Haldi Decor",
  "Bachelorette Parties",
  "Surprise Events",
  "Naming Ceremonies",
  "Engagement Decoration",
  "Baby Shower Decoration",
  "College Festivals",
  "Inaugurations",
  "Launch Events",
  "DJ Sound",
  "Lighting",
  "Festival Lighting",
];

/* ------------------------------------------------------------------ */
/* Occasions                                                           */
/* ------------------------------------------------------------------ */

export const OCCASIONS = [
  { name: "Wedding Events", icon: "rings" },
  { name: "Birthday Celebrations", icon: "cake" },
  { name: "Anniversaries", icon: "sparkle" },
  { name: "Bride-to-Be", icon: "flower" },
  { name: "Haldi Decor", icon: "flower" },
  { name: "Bachelorette Parties", icon: "sparkle" },
  { name: "Surprise Events", icon: "sparkle" },
  { name: "Naming Ceremony", icon: "cradle" },
  { name: "Engagement Decoration", icon: "rings" },
  { name: "Baby Shower Decoration", icon: "baby" },
  { name: "College Festivals", icon: "bulb" },
  { name: "Inaugurations & Launch Events", icon: "sparkle" },
  { name: "DJ Sound & Festival Lighting", icon: "bulb" },
];

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export interface Package {
  tier: string;
  subtitle: string;
  price: string;
  unit: string;
  best: string;
  features: string[];
  accent: string;
  popular: boolean;
}

export const PACKAGES: Package[] = [];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  meta: string;
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [];

/* ------------------------------------------------------------------ */
/* Frequently asked questions                                          */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "What services does Chethan Events offer?",
    a:
      "Chethan Events offers wedding events, birthday celebrations, anniversaries, bride-to-be celebrations, haldi decor, bachelorette parties, surprise events, naming ceremonies, engagement decoration, baby shower decoration, college festivals, inauguration and launch events, DJ sound and lighting.",
  },
  {
    q: "Where is Chethan Events based?",
    a:
      "Chethan Events is based in T. Narasipura, Mysore. Contact the team to check availability for your event location.",
  },
  {
    q: "How can I contact Chethan Events?",
    a:
      "Call 8296602176 or 8867185926. You can also send a WhatsApp enquiry to 8296602176.",
  },
  {
    q: "How do I enquire about pricing?",
    a:
      "Share your event type, date, venue and requirements with the team. Ask for pricing and confirm the services included before booking.",
  },
  {
    q: "Do you provide sound and lighting?",
    a:
      "Yes. DJ sound, lighting and festival lighting are listed among the services. Contact the team to discuss your event requirements.",
  },
  {
    q: "Where can I find Chethan Events on Instagram?",
    a:
      "Visit @chethan_events__audio using the Instagram link on this website.",
  },
];

/* ------------------------------------------------------------------ */
/* Location                                                            */
/* ------------------------------------------------------------------ */

export const COVERAGE = ["T. Narasipura, Mysore"];