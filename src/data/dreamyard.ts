// Central, CMS-ready configuration for Dreamyard Udaipur.
// Only verified business information is filled in. Unverified fields are left
// null/empty so nothing is invented — the owner can fill them in later.

export const business = {
  name: "Dreamyard Udaipur",
  shortName: "Dreamyard",
  category: "Backpacker Hostel",
  address: {
    line1: "23/165, Lal Ghat Road",
    line2: "Old City",
    city: "Udaipur",
    state: "Rajasthan",
    postalCode: "313004",
    country: "India",
  },
  rating: 4.8,
  reviewCount: 1215,
  checkIn: "1:00 PM",
  checkOut: "10:30 AM",
  phone: "073399 86366",
  phoneE164: "+917339986366",
  whatsappNumber: "917339986366",
  neighborhood: "Lal Ghat · Old City · Udaipur",
  mapsQuery: "Dreamyard Udaipur, Lal Ghat Road, Old City, Udaipur, Rajasthan 313004",
  amenities: [
    "Free Wi-Fi",
    "Paid breakfast",
    "Air conditioning",
    "Rooftop experience",
    "Lake Pichola views",
    "Central Old City location",
  ],
  // Not listed / unverified — intentionally excluded from the site copy.
  notAvailable: ["Parking", "Swimming pool", "Accessibility facilities"],
  bookingUrl: null as string | null, // set when a real booking engine exists
};

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.mapsQuery,
)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  business.mapsQuery,
)}&output=embed`;

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type Inclusion = { category: string; items: string[] };

export type StayPackage = {
  id: string;
  days: number;
  nights: number;
  title: string;
  subtitle: string;
  description: string;
  accommodation: string | null;
  meals: string | null;
  experiences: string[];
  activities: string[];
  inclusions: Inclusion[];
  exclusions: string[];
  price: string | null; // null → "Check availability"
  discount: string | null;
  bookingUrl: string | null;
  whatsappMessage?: string;
  active: boolean;
  featured: boolean;
};

const base = {
  accommodation: null,
  meals: null,
  experiences: [] as string[],
  activities: [] as string[],
  inclusions: [] as Inclusion[],
  exclusions: [] as string[],
  price: null,
  discount: null,
  bookingUrl: null,
  active: true,
  featured: false,
};

export const packages: StayPackage[] = [
  {
    ...base,
    id: "quick-escape",
    days: 2,
    nights: 1,
    title: "Quick Escape",
    subtitle: "2 Days / 1 Night",
    description: "For travellers making a short Udaipur stop.",
  },
  {
    ...base,
    id: "city-highlights",
    days: 3,
    nights: 2,
    title: "City Highlights",
    subtitle: "3 Days / 2 Nights",
    description: "For travellers wanting more time to experience the Old City.",
  },
  {
    ...base,
    id: "udaipur-explorer",
    days: 4,
    nights: 3,
    title: "Udaipur Explorer",
    subtitle: "4 Days / 3 Nights",
    description: "A balanced stay for exploring the city without rushing.",
    featured: true,
  },
  {
    ...base,
    id: "slow-explorer",
    days: 5,
    nights: 4,
    title: "Slow Explorer",
    subtitle: "5 Days / 4 Nights",
    description: "For travellers who want additional time to experience Udaipur.",
  },
  {
    ...base,
    id: "slow-traveller",
    days: 6,
    nights: 5,
    title: "Slow Traveller",
    subtitle: "6 Days / 5 Nights",
    description: "For guests who want to settle into the city's rhythm.",
  },
  {
    ...base,
    id: "full-escape",
    days: 7,
    nights: 6,
    title: "The Full Escape",
    subtitle: "7 Days / 6 Nights",
    description: "For travellers who want an extended Udaipur experience.",
  },
];

export function packageWhatsapp(p: StayPackage) {
  return (
    p.whatsappMessage ??
    `Hi Dreamyard Udaipur, I'm interested in the ${p.title} package for ${p.subtitle}. Please share availability and details.`
  );
}

export type Room = {
  id: string;
  name: string;
  description: string;
  occupancy: string | null;
  amenities: string[];
  price: string | null;
  available: boolean;
  image: "dorm" | "private";
};

// Placeholder, CMS-ready structure. No invented categories, prices or counts.
export const rooms: Room[] = [
  {
    id: "shared",
    name: "Shared Stay",
    description:
      "Room details are confirmed directly with Dreamyard. Message us and we'll share what's available for your dates.",
    occupancy: null,
    amenities: ["Free Wi-Fi", "Air conditioning"],
    price: null,
    available: true,
    image: "dorm",
  },
  {
    id: "private",
    name: "Private Stay",
    description:
      "Looking for a room of your own? Ask us about private options and current availability for your dates.",
    occupancy: null,
    amenities: ["Free Wi-Fi", "Air conditioning"],
    price: null,
    available: true,
    image: "private",
  },
];

export const faqs = [
  {
    q: "What time is check-in at Dreamyard Udaipur?",
    a: `Check-in is from ${business.checkIn}.`,
  },
  { q: "What time is check-out?", a: `Check-out is at ${business.checkOut}.` },
  {
    q: "Where is Dreamyard Udaipur located?",
    a: "Dreamyard Udaipur is at 23/165, Lal Ghat Road, Old City, Udaipur, Rajasthan 313004, India.",
  },
  {
    q: "Does Dreamyard Udaipur offer free Wi-Fi?",
    a: "Yes, free Wi-Fi is available.",
  },
  {
    q: "Does Dreamyard Udaipur have air conditioning?",
    a: "Yes, air conditioning is available.",
  },
  {
    q: "Does Dreamyard Udaipur have a rooftop restaurant?",
    a: "Yes, Dreamyard has a rooftop restaurant experience. Breakfast is available at extra cost.",
  },
  {
    q: "Does Dreamyard Udaipur have Lake Pichola views?",
    a: "Yes, the rooftop looks out over Lake Pichola and the Old City.",
  },
  {
    q: "How can I contact Dreamyard Udaipur?",
    a: `Call or message ${business.phone}, or send a WhatsApp enquiry from this page.`,
  },
  {
    q: "How can I book a stay?",
    a: "Plan your stay directly with Dreamyard — send an enquiry on WhatsApp or call us, and we'll confirm availability for your dates.",
  },
  {
    q: "What stay packages are available?",
    a: "You can plan a stay from 2 to 7 days. Each duration has a suggested positioning — from a Quick Escape to The Full Escape. Inclusions and pricing are confirmed directly with Dreamyard.",
  },
  {
    q: "How do I choose a package?",
    a: "Pick the number of days you're staying in the planner above, review the suggestion, then ask on WhatsApp to confirm availability and details.",
  },
];
