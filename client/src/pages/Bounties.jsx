import React from 'react'
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Coins } from "lucide-react"
 const Bounties = () => {
    const bounties = [
  {
    id: 1,
    title: "Smart Contract Vulnerability in DeFi Protocol",
    reward: 500,
    postedDate: "2024-01-15",
    tags: ["Smart Contract", "DeFi", "Critical"],
    description: "Looking for potential vulnerabilities in our lending protocol smart contracts.",
  },
  {
    id: 2,
    title: "Frontend Security Issues in Wallet Interface",
    reward: 250,
    postedDate: "2024-01-14",
    tags: ["Frontend", "Security", "Medium"],
    description: "Review wallet interface for potential security vulnerabilities and UX issues.",
  },
  {
    id: 3,
    title: "API Endpoint Security Review",
    reward: 150,
    postedDate: "2024-01-13",
    tags: ["API", "Backend", "Low"],
    description: "Comprehensive security review of our REST API endpoints and authentication.",
  },
  {
    id: 4,
    title: "Cross-Chain Bridge Audit",
    reward: 1000,
    postedDate: "2024-01-12",
    tags: ["Bridge", "Cross-Chain", "Critical"],
    description: "Security audit of our cross-chain bridge implementation for asset transfers.",
  },
]
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug Bounties</h1>
          <p className="text-gray-600">Find and fix vulnerabilities to earn STX rewards</p>
        </div>
        <Link to="/post-bounty">
          <Button>Post New Bounty</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bounties.map((bounty) => (
          <Card key={bounty.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg leading-tight">{bounty.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Coins className="h-4 w-4" />
                  <span>{bounty.reward} STX</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{bounty.postedDate}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{bounty.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {bounty.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link to={`/bounties/${bounty.id}`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default Bounties
