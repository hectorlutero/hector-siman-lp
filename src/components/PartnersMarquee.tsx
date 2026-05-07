"use client";

import Image from "next/image";
import { useState } from "react";

const partners = [
  { name: "Kaptha Lead", logo: "/images/logo-kaptha-lead.png" },
  { name: "GreenSignal", logo: "/images/logo-green-signal.png" },
  { name: "Red Peak Digital", logo: "/images/logo-redpeak-digital.png" },
  { name: "Mart Minas", logo: "/images/logo-mart-minas.png" },
  { name: "Supply Chayn", logo: "/images/logo-supplychayn.png" },
  { name: "BrandSwaggin", logo: "/images/logo-brandswaggin.png" },
];

// Triple for seamless infinite loop
const allPartners = [...partners, ...partners, ...partners];

function PartnerLogo({ partner }: { partner: (typeof partners)[0] }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span className="inline-flex items-center gap-2 text-muted/60 hover:text-muted transition-colors font-semibold text-sm tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
        {partner.name}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center w-[180px] max-h-[70px] h-[100px] shrink-0">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={180}
        height={56}
        className="object-contain w-full h-full brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300"
        onError={() => setImgError(true)}
        unoptimized
      />
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="py-12 border-y border-card-border overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <p className="text-center text-xs text-muted/40 tracking-widest uppercase mb-8 font-medium">
        Empresas Parceiras
      </p>

      <div className="flex gap-20 animate-marquee whitespace-nowrap items-center">
        {allPartners.map((partner, i) => (
          <span
            key={`${partner.name}-${i}`}
            className="shrink-0 inline-flex items-center"
          >
            <PartnerLogo partner={partner} />
          </span>
        ))}
      </div>
    </section>
  );
}
