import {
  connect,
  disconnect,
  isConnected,
  request,
  getLocalStorage,
} from "@stacks/connect";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Wallet, Bug, Menu, LogOut, Copy } from "lucide-react";

export function Navbar() {
  const connectWallet = async () => {
    await connect();
    window.location.reload();
  };
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { address, isConnected } = useSelector((state) => state.wallet);

  const disconnectWallet = () => {
    disconnect();
    window.location.reload();
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const navItems = [
    { to: "/bounties", label: "Bounties" },
    { to: "/post-bounty", label: "Post Bounty" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Bug className="h-6 w-6 text-gray-700" />
            <span className="text-xl font-semibold text-gray-900">
              Git Bounty
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button - Only visible on mobile */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Wallet Button/Dropdown */}
            {!isConnected ? (
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={connectWallet}
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {shortenAddress(address)}
                    </span>
                    <span className="sm:hidden">{address.slice(0, 4)}...</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  
                  <DropdownMenuItem
                    onClick={copyAddress}
                    className="cursor-pointer"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={disconnectWallet}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
