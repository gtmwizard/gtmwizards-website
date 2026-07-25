// Empty for launch — gtmWizards is new and we do not fake social proof.
// When the first client references arrive, add them here and the
// TestimonialStrip component will render automatically on the homepage.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: { value: string; label: string };
};

export const testimonials: Testimonial[] = [];
