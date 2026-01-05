export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-2xl">build</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Rev</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Modern mobile repair for the modern world. Fast, trusted, and powered by AI technology.
            </p>
            <div className="flex gap-4">
              {[
                { icon: "twitter", href: "#" },
                { icon: "instagram", href: "#" },
                { icon: "linkedin", href: "#" }
              ].map((social, i) => (
                <a key={i} className="w-10 h-10 bg-gray-100 hover:bg-primary rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all duration-200 transform hover:-translate-y-1" href={social.href}>
                  <span className="material-symbols-outlined text-[18px]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press Kit", "Contact"].map((item, i) => (
                <li key={i}>
                  <a className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Track Repair", "Warranty Info", "FAQ"].map((item, i) => (
                <li key={i}>
                  <a className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((item, i) => (
                <li key={i}>
                  <a className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-medium">© 2024 Rev Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Made with ❤️ for device owners everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}