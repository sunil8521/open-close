import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Github,
  Satellite,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { request } from "@stacks/connect";
import { useIssueWithPRs } from "../hooks/useIssueWithPRs";
export default function Submission() {
  const { id } = useParams();
  const { state } = useLocation();

  const { issue, prs, loading, refetch } = useIssueWithPRs(id);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">{status}</Badge>;
      case "Approved":
        return <Badge variant="default">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  const sendSTX = async (address, PRid) => {
    try {
      // const response = await request("stx_transferStx", {
      //   amount: parseInt(state) * 1000000,
      //   recipient: address, // recipient address
      //   network: "testnet",
      // });
      await updateDoc(doc(db, "prs", PRid), {
        status: "Approved",
      });
      refetch();
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/mybounty"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Bounties</span>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Submissions
            </h1>
            <p className="text-gray-600">{issue?.title}</p>
          </div>
          {/* <div className="text-right">
            <div className="text-xl font-bold text-gray-900">
              {issue.reward} STX
            </div>
            <div className="text-sm text-gray-600">Reward</div>
          </div> */}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {prs?.map((submission) => (
          <Card key={submission.bountyId}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {submission.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 w-md">
                    {submission.description}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    By {submission.researcher}
                  </p> */}
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(submission.status)}

                  <a
                    href={submission.githubPR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>

                  {submission.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          sendSTX(submission.submitterAddress, submission.id);
                        }}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
