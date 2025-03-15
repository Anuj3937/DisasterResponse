import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
            <ShieldAlert className="text-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold">DisasterResponse</h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/">
            <a className="font-medium hover:text-primary transition-colors">Home</a>
          </Link>
          <Link href="/about">
            <a className="font-medium hover:text-primary transition-colors">About</a>
          </Link>
          <Link href="/resources">
            <a className="font-medium hover:text-primary transition-colors">Resources</a>
          </Link>
          <Link href="/contact">
            <a className="font-medium hover:text-primary transition-colors">Contact</a>
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/">
              <a className="font-medium hover:text-primary transition-colors">Home</a>
            </Link>
            <Link href="/about">
              <a className="font-medium hover:text-primary transition-colors">About</a>
            </Link>
            <Link href="/resources">
              <a className="font-medium hover:text-primary transition-colors">Resources</a>
            </Link>
            <Link href="/contact">
              <a className="font-medium hover:text-primary transition-colors">Contact</a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
