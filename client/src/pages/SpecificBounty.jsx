import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Coins, ExternalLink, Github } from "lucide-react";
import { useParams } from "react-router-dom";

const SpecificBounty = () => {
  const { id } = useParams();
  const bounty = {
    id: id,
    title: "Smart Contract Vulnerability in DeFi Protocol",
    reward: 500,
    postedDate: "2024-01-15",
    tags: ["Smart Contract", "DeFi", "Critical"],
    description:
      "We are looking for security researchers to review our DeFi lending protocol smart contracts. The contracts handle user deposits, withdrawals, and interest calculations. We're particularly concerned about potential reentrancy attacks, integer overflow/underflow, and access control vulnerabilities.",
    requirements: [
      "Provide detailed vulnerability report with proof of concept",
      "Include steps to reproduce the issue",
      "Suggest mitigation strategies",
      "Submit findings through GitHub pull request",
    ],
    githubRepo: "https://github.com/example/defi-protocol",
    submissionDeadline: "2024-02-15",
    status: "Active",
  };
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {bounty.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{bounty.reward} STX Reward</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Posted {bounty.postedDate}</span>
            </div>
            <Badge
              variant={bounty.status === "Active" ? "default" : "secondary"}
            >
              {bounty.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {bounty.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {bounty.description}
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {bounty.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Bounty Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Reward Amount
                  </label>
                  <p className="text-2xl font-bold text-gray-900">
                    {bounty.reward} STX
                  </p>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Submission Deadline
                  </label>
                  <p className="text-gray-900">{bounty.submissionDeadline}</p>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Repository
                  </label>
                  <a
                    href={bounty.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <Separator />

                <Button className="w-full" size="lg">
                  <Github className="h-4 w-4 mr-2" />
                  Submit Fix (GitHub PR)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificBounty;
