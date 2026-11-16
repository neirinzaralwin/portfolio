/**
 * People I've worked with.
 *
 * Every entry below is a PLACEHOLDER so the layout can be seen. Replace each
 * one with a real quote from a real person (and their permission), then
 * delete `placeholder: true`. Cards still flagged as placeholders render with
 * a dashed outline and a "Placeholder" tag, so none can ship by accident
 * looking like a genuine endorsement.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional photo under /public, e.g. "/people/jane.jpg". */
  avatar?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Paste a real quote here. Two or three sentences on what you built together and how the work went.",
    name: "Colleague name",
    role: "Role",
    company: "Flying Rocket Co., Ltd.",
    placeholder: true,
  },
  {
    quote: "A short one-line quote works well in this slot.",
    name: "Colleague name",
    role: "Role",
    company: "GoldSilver Central",
    placeholder: true,
  },
  {
    quote:
      "A longer quote goes here. Longer notes make the grid feel like a real wall of messages: what the project was, what you were responsible for, what changed because of it, and whether they would work with you again.",
    name: "Colleague name",
    role: "Role",
    company: "App.com.mm",
    placeholder: true,
  },
  {
    quote:
      "Paste a real quote here. Something specific beats something flattering.",
    name: "Colleague name",
    role: "Role",
    company: "Tech Plus Solution",
    placeholder: true,
  },
  {
    quote:
      "A medium quote goes here. One concrete result is enough: a launch date met, a hard bug found, a team unblocked.",
    name: "Client name",
    role: "Role",
    company: "Company",
    placeholder: true,
  },
  {
    quote:
      "Paste a real quote here. Research collaborators and co-authors count too.",
    name: "Co-author name",
    role: "Role",
    company: "Institution",
    placeholder: true,
  },
  {
    quote: "Another short quote for this slot.",
    name: "Colleague name",
    role: "Role",
    company: "Flying Rocket Co., Ltd.",
    placeholder: true,
  },
  {
    quote:
      "A longer quote goes here. Ask people for a few honest lines rather than a polished paragraph; the uneven lengths are what give a masonry grid its rhythm.",
    name: "Colleague name",
    role: "Role",
    company: "GoldSilver Central",
    placeholder: true,
  },
];
