/**
 * Configurable customer reviews. Replace with verified reviews when supplied —
 * no Google rating or review count is claimed anywhere on the site.
 */
export type Review = {
  id: string;
  rating: number;
  text: string;
  name: string;
  branch: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    rating: 5,
    text: "The chicken cheese naan is the reason I keep coming back. Fresh from the tandoor every single time.",
    name: "Customer review",
    branch: "Hayatabad Phase 4",
  },
  {
    id: "r2",
    rating: 5,
    text: "Ordered the full karahi for a family dinner — generous portion and proper desi flavour.",
    name: "Customer review",
    branch: "Warsak Road",
  },
  {
    id: "r3",
    rating: 5,
    text: "Great BBQ platter and quick service. The special burger is easily a favourite.",
    name: "Customer review",
    branch: "Nasir Bagh Road",
  },
];
