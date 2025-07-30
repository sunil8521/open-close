import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Coins, ExternalLink, Github, Satellite,Clock ,User} from "lucide-react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SubmitFix from "@/components/SubmitFix";

const SpecificBounty = () => {
  // const { id } = useParams();
  const { state } = useLocation();

  return (
    <>
   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Compact Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{state.title}</h1>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Posted {state.createdAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Due {state.deadline}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {state.priority}
              </Badge>
              <Badge variant={state.status === "open" ? "default" : "secondary"} className="text-xs">
                {state.status}
              </Badge>
            </div>
          </div>

          {/* Compact Reward Display */}
          <div className="flex items-center space-x-4 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-1">
            <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:text-right">
              <Coins className="h-5 w-5 text-gray-700" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{state.reward} STX</div>
                <div className="text-sm text-gray-600">Reward</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Row Layout */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content - Takes 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Description Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{state.description}</p>
            </CardContent>
          </Card>

          {/* Repository Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Github className="h-5 w-5" />
                <span>Repository</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">GitHub Repository</p>
                  <p className="text-sm text-gray-600">Review the codebase and submit your findings</p>
                </div>
                <a
                  href={state.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  <span>View Code</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compact Sidebar - Takes 1 column */}
        <div className="space-y-4">
<SubmitFix bountyId={state.id} bountyTitle={state.title} owner={state.owner}/>

          {/* Primary Action */}
          {/* <Button className="w-full" size="lg">
            <Github className="h-4 w-4 mr-2" />
            Submit Fix
          </Button> */}

          {/* Quick Info Card */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">Quick Info</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <span className="font-medium">{state.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium capitalize">{state.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reward:</span>
                    <span className="font-medium">{state.reward} STX</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600 mb-2">Need Help?</div>
              <p className="text-xs text-gray-500 leading-relaxed">Join our community for support and discussions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default SpecificBounty;
