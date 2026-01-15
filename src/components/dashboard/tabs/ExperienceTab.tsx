const testimonials = [
  {
    id: 1,
    quote: "The structured approach removed the guesswork entirely. We knew exactly what to expect at each stage.",
    attribution: "Franchise Buyer",
    context: "Multi-unit acquisition",
  },
  {
    id: 2,
    quote: "Having someone who understood both sides of the table made negotiations feel less adversarial.",
    attribution: "Franchise Seller",
    context: "Regional territory exit",
  },
  {
    id: 3,
    quote: "The timeline clarity alone was worth it. We avoided months of back-and-forth.",
    attribution: "Franchise Buyer",
    context: "First-time buyer",
  },
  {
    id: 4,
    quote: "I appreciated the direct communication style. No fluff, just clear next steps.",
    attribution: "Franchise Seller",
    context: "Portfolio consolidation",
  },
  {
    id: 5,
    quote: "The process documentation helped our legal team work more efficiently.",
    attribution: "Franchise Buyer",
    context: "Corporate acquisition",
  },
  {
    id: 6,
    quote: "Richard's perspective on timing was particularly valuable during our negotiations.",
    attribution: "Franchise Seller",
    context: "Single-unit sale",
  },
];

const ExperienceTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card space-y-4">
            <blockquote className="text-foreground leading-relaxed">
              "{testimonial.quote}"
            </blockquote>
            <div className="pt-2 border-t border-border">
              <p className="text-sm font-medium text-foreground">
                {testimonial.attribution}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {testimonial.context}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTab;
