import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const menuItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", child: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Account", href: "/profile" },
];

export const socialLinks = [
  { Icon: Instagram, href: "/", label: "Instagram" },
  { Icon: Facebook, href: "/", label: "Facebook" },
  { Icon: Youtube, href: "/", label: "YouTube" },
  { Icon: Twitter, href: "/", label: "Twitter" },
];
