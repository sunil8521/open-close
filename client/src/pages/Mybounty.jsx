import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Eye, Users, Coins } from "lucide-react";
import { useBounties } from "@/hooks/useBounties";
import { useSelector } from "react-redux";

function Mybounty() {
  const { address } = useSelector((state) => state.wallet);

  const { bounties, loading, error } = useBounties(address);

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return <Badge variant="default">{status}</Badge>;
      case "closed":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    const variant =
      priority === "Critical"
        ? "destructive"
        : priority === "High"
        ? "destructive"
        : priority === "Medium"
        ? "secondary"
        : "outline";
    return <Badge variant={variant}>{priority}</Badge>;
  };
  if (address == null) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-gray-600 text-lg">
          Connect you wallet to see deatils
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-gray-600 text-lg">Quering blockChain...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Posted Bounties
          </h1>
          <p className="text-gray-600">
            Manage your bug bounty listings and track submissions
          </p>
        </div>
        <Link to="/post-bounty">
          <Button>Post New Bounty</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {bounties?.map((bounty) => (
          <Card
            key={bounty.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl mb-2">{bounty.title}</CardTitle>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {bounty.postedDate}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4" />
                      <span>{bounty.reward} STX</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(bounty.status)}
                  {getPriorityBadge(bounty.priority)}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {bounty.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {bounty.submittedPRs.length == 0 ? (
                       <Badge  variant="secondary" className="text-xs">
                    {"No submissions"}
                  </Badge>
                  
                  ) : (
                    <>
                      <Link to={`/my-bounties/${bounty.id}/submissions`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          View Submissions ({bounty.submittedPRs.length})
                        </Button>
                      </Link>
                    </>
                  )}

                  <Link to={`/my-bounties/${bounty.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      {/* <Edit className="h-4 w-4 mr-1" /> */}
                      Close Issue
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bounties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't posted any bounties yet.
          </p>
          <Link to="/post-bounty">
            <Button>Post Your First Bounty</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Mybounty;
