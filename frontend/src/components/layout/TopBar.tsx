import { Phone, MapPin, Zap, MessageCircle } from "lucide-react";

const TopBar = () => (
  <div className="bg-primary py-2 px-4 relative z-50">
    <div className="container flex items-center justify-between text-xs sm:text-sm text-primary-foreground">
      <span className="hidden md:flex items-center gap-1.5 opacity-80">
        <MapPin className="w-3.5 h-3.5" />
24 Avenue Joannés Masset, Lyon 69009
      </span>
      <span className="flex items-center gap-1.5 text-center">
        <Zap className="w-3.5 h-3.5 text-gold" />
        <span className="font-medium">Intervention rapide Lyon & région — 7j/7</span>
      </span>
      <a
        href="tel:0609991736"
        className="hidden sm:flex items-center gap-1.5 hover:opacity-80 transition-opacity"
      >
        <Phone className="w-3.5 h-3.5" />
        <span className="font-semibold">06 09 99 17 36</span>
      </a>
      <a
        href="https://wa.me/33609991736"
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  </div>
);

export default TopBar;
