
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ConsentModal from "./ConsentModal";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full glass-morphism px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-spectrum animate-pulse-glow"></div>
            <span className="text-xl font-bold text-gradient">ChainMed</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link hover:text-spectrum-purple transition-colors">
              Home
            </Link>
            <Link to="/donor-registration" className="nav-link hover:text-spectrum-purple transition-colors">
              Donor Registration
            </Link>
            <Link to="/recipient-matching" className="nav-link hover:text-spectrum-purple transition-colors">
              Find Match
            </Link>
            <Link to="/about" className="nav-link hover:text-spectrum-purple transition-colors">
              How It Works
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button onClick={toggleMenu} className="ml-4 text-2xl focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link to="/" className="py-2 text-center hover:text-spectrum-purple transition-colors">
                  Home
                </Link>
                <Link to="/donor-registration" className="py-2 text-center hover:text-spectrum-purple transition-colors">
                  Donor Registration
                </Link>
                <Link to="/recipient-matching" className="py-2 text-center hover:text-spectrum-purple transition-colors">
                  Find Match
                </Link>
                <Link to="/about" className="py-2 text-center hover:text-spectrum-purple transition-colors">
                  How It Works
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet context={{ setShowConsentModal }} />
      </main>

      {/* Consent Modal */}
      <ConsentModal isOpen={showConsentModal} onClose={() => setShowConsentModal(false)} />

      {/* Footer */}
      <footer className="glass-morphism py-8 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} ChainMed - Decentralized Organ Donor-Recipient Matching Platform
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/about" className="text-sm hover:text-spectrum-purple transition-colors">
              About
            </Link>
            <Link to="/" className="text-sm hover:text-spectrum-purple transition-colors">
              Privacy
            </Link>
            <Link to="/" className="text-sm hover:text-spectrum-purple transition-colors">
              Terms
            </Link>
            <Link to="/admin" className="text-sm hover:text-spectrum-purple transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
