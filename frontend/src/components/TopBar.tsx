import { Phone, MessageCircle } from "lucide-react";

const TopBar = () => (
  <div className="bg-primary py-2 px-4">
    <div className="container flex items-center justify-center gap-4 text-sm text-primary-foreground">
      <a href="tel:0609991736" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Phone className="w-4 h-4 animate-pulse" />
        <span className="font-medium">📞 06 09 99 17 36 — Intervention rapide Lyon & région (200km)</span>
      </a>
      <a
        href="https://wa.me/33609991736"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    </div>
  </div>
);

export default TopBar;
