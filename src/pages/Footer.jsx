"use client";

export const Footer = ({ navigateTo }) => {
  const companyLinks = [
    { label: "About Us", page: "about" },
    { label: "Careers", page: "careers" },
    { label: "Blog", page: "resources" },
    { label: "Capabilities", page: "capabilities" },
  ];

  const serviceLinks = [
    { label: "Quality Engineering", page: "service-quality-engineering" },
    { label: "Cloud Technologies", page: "service-cloud-technologies" },
    { label: "Application Services", page: "service-application-services" },
    { label: "Digital Platforms", page: "service-digital-platforms" },
    { label: "AI Services", page: "service-ai-services" },
  ];

  return (
    <footer className="relative px-6 py-16 overflow-hidden text-white border-t border-neutral-800 bg-neutral-950">
      {/* Blurred Background Logo */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "url('/images/cjss-logo.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "blur(20px)",
        }}
      ></div>

      <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 mb-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">CJSS</h3>
            <p className="text-white">Making your journey successful</p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="transition-colors hover:text-purple-400 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-bold text-white">Services</h4>
            <ul className="space-y-2 text-neutral-400">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="transition-colors hover:text-purple-400 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-bold text-white">Connect</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a
                  href="https://www.linkedin.com/company/cjss-technologies/posts/?feedView=all"
                  target="_blank"
                  className="transition-colors hover:text-purple-400 cursor-pointer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-purple-400 cursor-pointer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-purple-400 cursor-pointer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 text-center text-white border-t border-neutral-800">
          <p>&copy; 2025 CJSS Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
