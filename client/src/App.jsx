import { Link, BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap } from "lucide-react";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Postbounty from "./pages/Postbounty";
import Bounties from "./pages/Bounties";
import SpecificBounty from "./pages/SpecificBounty";
import Mybounty from "./pages/Mybounty"
import { useEffect } from "react";
import { Toaster } from "sonner"; // or from "sonner" if not using shadcn/ui

import {
  connect,
  disconnect,
  isConnected,
  request,
  getLocalStorage,
} from "@stacks/connect";
import { useDispatch } from "react-redux";
import { connectWallet } from "./storage/walletSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isConnected()) {
      const stored = getLocalStorage();
      const stx = stored?.addresses?.stx?.[0]?.address;
      if (stx) {
        dispatch(connectWallet(stx));
      }
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" richColors />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post-bounty" element={<Postbounty />} />
              <Route path="/bounties" element={<Bounties />} />
              <Route path="/bounties/:id" element={<SpecificBounty />} />
              <Route path="/mybounty" element={<Mybounty />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
 