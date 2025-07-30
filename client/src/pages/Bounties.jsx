import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Coins } from "lucide-react";
import {useBounties} from "../hooks/useBounties"


const Bounties = () => {
  const {bounties,error,loading}=useBounties()



  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-gray-600 text-lg">Quering blockChain...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Git Bounties</h1>
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
              <div className="flex space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Coins className="h-4 w-4" />
                  <span>{bounty.reward} STX</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{bounty.deadline}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className={"flex flex-col h-fit"}>
              <p className="text-gray-600 mb-4 line-clamp-2">{bounty.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {/* {bounty.priority?.map((tag) => ( */}
                  {/* <Badge key={tag} variant="secondary" className="text-xs"> */}
                  <Badge  variant="secondary" className="text-xs">
                    {bounty.priority}
                  </Badge>
                {/* ))} */}
              </div>
              <Link to={`/bounties/${bounty.id}`} state={bounty} className="justisy-end" >
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bounties;
