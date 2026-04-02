import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => (
  <>
    {/* WhatsApp */}
    <a
      href="https://wa.me/33609991736"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-whatsapp p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-accent-foreground" />
    </a>

    {/* Mobile call */}
    <a
      href="tel:0609991736"
      className="fixed bottom-6 left-6 z-50 md:hidden bg-primary p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      aria-label="Appeler"
    >
      <Phone className="w-6 h-6 text-primary-foreground" />
    </a>
  </>
);

export default FloatingButtons;
