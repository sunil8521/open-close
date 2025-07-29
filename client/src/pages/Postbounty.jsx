import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { saveOffchainBounty, deleteOffchainBounty } from "../db/functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cl,
  makeContractCall,
  broadcastTransaction,
  stringAsciiCV,
  uintCV,
  AnchorMode,
} from "@stacks/transactions";
import { request } from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions";

const Postbounty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubRepo: "",
    reward: "",
    priority: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const { isConnected } = useSelector((state) => state.wallet);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      toast.warning("Please connect your wallet.");
      return;
    }

    setLoading(true);
    toast.info("Submitting bounty...");

    let offchainRef;
    try {
      offchainRef = await saveOffchainBounty(formData);
      if (!offchainRef) {
        toast.error("Failed to save bounty. Try again.");
        setLoading(false);
        return;
      }

      await request("stx_callContract", {
        contract: "ST24PT28CZ0M6PKFWRNMTHVQSF8ZKCFQ6EEBGM2AP.bounty",
        functionName: "create-bounty",
        functionArgs: [Cl.uint(1), Cl.stringAscii(offchainRef)],
        network: "testnet",
        appDetails: {
          name: "BitcoinStack Bounty",
          icon: "https://bitcoinstack.app/icon.png",
        },
      });

      toast.success("Bounty submitted!");
      setFormData({
        title: "",
        description: "",
        githubRepo: "",
        reward: "",
        priority: "",
        deadline: "",
      });
    } catch (err) {
      toast.error("Transaction failed or cancelled.");
      // Delete bounty from Firebase if transaction fails
      if (offchainRef) {
        try {
          await deleteOffchainBounty(offchainRef);
        } catch (deleteErr) {
          console.error("Failed to delete bounty from Firebase:", deleteErr);
        }
      }
      setFormData({
        title: "",
        description: "",
        githubRepo: "",
        reward: "",
        priority: "",
        deadline: "",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Post New Bounty
        </h1>
        <p className="text-gray-600">
          Create a new bug bounty to find security vulnerabilities in your
          project
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bounty Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Bounty Title</Label>
              <Input
                id="title"
                placeholder="e.g., Smart Contract Security Review"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about what you're looking for, specific areas of concern, and any relevant context..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 min-h-[120px]"
                // required
              />
            </div>

            <div>
              <Label htmlFor="githubRepo">GitHub Repository URL</Label>
              <Input
                id="githubRepo"
                type="url"
                placeholder="https://github.com/username/repository"
                value={formData.githubRepo}
                onChange={(e) =>
                  setFormData({ ...formData, githubRepo: e.target.value })
                }
                className="mt-1"
                // required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reward">Reward Amount (STX)</Label>
                <Input
                  id="reward"
                  type="number"
                  placeholder="100"
                  value={formData.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: e.target.value })
                  }
                  className="mt-1"
                  // required
                />
              </div>

              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="deadline">Submission Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="mt-1"
                // required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                disabled={loading}
                type="submit"
                className="flex-1 cursor-pointer"
              >
                {loading ? "Submitting..." : "Post Bounty"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Postbounty;
