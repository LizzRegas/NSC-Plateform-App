import { Church, Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Church className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-semibold text-white">
                Lumina
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A beautifully designed, all-in-one platform for modern churches to manage their congregation, worship, and giving.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-white/60">
                <Heart className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">People & Groups</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Giving & Accounting</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Worship Planning</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Events & Check-in</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Communication</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Webinars</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Case Studies</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>1200 Grace Avenue<br/>Suite 300<br/>San Francisco, CA 94108</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@luminachurch.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Lumina Church Software. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
