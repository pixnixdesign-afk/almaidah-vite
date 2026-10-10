export type Branch = {
  id: string;
  number: string;
  name: string;
  address: string;
  area: string;
  /** Configurable — no phone numbers invented. */
  phone: string | null;
  /** Google Maps search link built from the real address (no fabricated coordinates). */
  mapUrl: string;
  /** Opening hours are not published yet; keep null until supplied. */
  hours: string | null;
  isOpen: boolean | null;
};

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const BRANCHES: Branch[] = [
  {
    id: "f8-phase-6",
    number: "01",
    name: "F-8 Phase 6",
    address: "F-8 Street 1, F-8 Phase 6 Hayatabad, Peshawar, Pakistan",
    area: "Hayatabad",
    phone: null,
    mapUrl: maps("Al-Maidah Cafe F-8 Street 1, F-8 Phase 6 Hayatabad, Peshawar"),
    hours: null,
    isOpen: null,
  },
  {
    id: "hayatabad-phase-4",
    number: "02",
    name: "Hayatabad Phase 4",
    address: "Bismillah Market, Opposite HMC, Phase 4 Hayatabad, Peshawar, Pakistan",
    area: "Hayatabad",
    phone: null,
    mapUrl: maps("Al-Maidah Cafe Bismillah Market Opposite HMC Phase 4 Hayatabad Peshawar"),
    hours: null,
    isOpen: null,
  },
  {
    id: "nasir-bagh-road",
    number: "03",
    name: "Nasir Bagh Road",
    address: "Nasir Bagh Road, Peshawar, 25000, Pakistan",
    area: "Nasir Bagh",
    phone: null,
    mapUrl: maps("Al-Maidah Cafe Nasir Bagh Road Peshawar 25000"),
    hours: null,
    isOpen: null,
  },
  {
    id: "warsak-road",
    number: "04",
    name: "Warsak Road",
    address:
      "Aqua Tower, Warsak Road, near Frontier School, Irshadabad Darmangi, Peshawar, 25000, Pakistan",
    area: "Warsak Road",
    phone: null,
    mapUrl: maps("Al-Maidah Cafe Aqua Tower Warsak Road Irshadabad Darmangi Peshawar"),
    hours: null,
    isOpen: null,
  },
];

export const getBranch = (id: string | null) => BRANCHES.find((b) => b.id === id) ?? null;
