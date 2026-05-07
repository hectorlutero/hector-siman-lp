"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5531993443134"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
