import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shield, Users, Zap } from "lucide-react"
import React from 'react'

 const Home = () => {
  return (
    <>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-20 lg:py-32">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          Secure Web3 Projects
          <br />
          <span className="text-gray-600">Through Bug Bounties</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect security researchers with Web3 projects. Find vulnerabilities, earn STX rewards, and help build a more
          secure decentralized future.
        </p>
        <Link to="/bounties">
          <Button size="lg" className="px-8 py-3 text-lg">
            View Bounties
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="py-20 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Trusted</h3>
            <p className="text-gray-600 leading-relaxed">
              Built on Stacks blockchain with transparent reward distribution and verified submissions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with skilled security researchers and developers from around the world.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Rewards</h3>
            <p className="text-gray-600 leading-relaxed">
              Quick verification process with instant STX rewards upon successful bug submissions.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Home