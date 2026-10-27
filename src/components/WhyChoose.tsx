import Image from "next/image";

const features = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    icon: "/images/ShieldCheck.png",
    iconAlt: "",
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    icon: "/images/MapTrifold.png",
    iconAlt: "",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    icon: "/images/Headset.png",
    iconAlt: "",
  },
];

export default function WhyChoose() {
  return (
    <section
      aria-labelledby="why-choose-title"
      className="relative min-h-[440px] border border-[#1598ff] bg-[#edfbfd] px-6 py-16 sm:px-10 sm:py-20"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-10 h-0.5 w-[18px] -translate-x-1/2 bg-[#1598ff]"
      />
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden h-[19px] w-0.5 -translate-y-1/2 bg-[#1598ff] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden h-[19px] w-0.5 -translate-y-1/2 bg-[#1598ff] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 h-0.5 w-[18px] -translate-x-1/2 bg-[#1598ff]"
      />

      <div className="mx-auto max-w-[890px]">
        <header className="text-center">
          <h2
            id="why-choose-title"
            className="text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950"
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Your trusted partner for exceptional travel experiences
          </p>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="min-h-[174px] bg-white px-7 py-7 shadow-[0_1px_1px_rgba(15,23,42,0.12)]"
            >
              <Image
                src={feature.icon}
                alt={feature.iconAlt}
                width={32}
                height={32}
                className="mb-4 size-7 object-contain"
              />
              <h3 className="text-xl leading-tight font-light tracking-[-0.055em] text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-[1.45] text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
