import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { saveOffchainBounty } from "../db/functions";
import {
  Cl,
  makeContractCall,
  broadcastTransaction,
} from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
// import { StacksTestnet } from "@stacks/network";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";
const Postbounty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubRepo: "",
    reward: "",
    priority: "",
    deadline: "",
  });

  const { isConnected } = useSelector((state) => state.wallet);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      toast.warning("Please connect your wallet.");
      return;
    }

    // Handle form submission
    const offchainRef = await saveOffchainBounty(formData);
    console.log(offchainRef);

    const functionArgs = [Cl.uint(1), Cl.stringAscii(offchainRef)];
    console.log(functionArgs);
    const txOptions = {
      contractAddress: "ST24PT28CZ0M6PKFWRNMTHVQSF8ZKCFQ6EEBGM2AP",
      contractName: "bounty",
      functionName: "create-bounty",
      functionArgs,
      network:"testnet",
    };

    try {
      const transaction = await makeContractCall(txOptions);
      console.log("1", transaction);
      const result = await broadcastTransaction({ transaction });
      console.log("Transaction broadcasted. TxID:", result.txid);
    } catch (err) {
      console.error("Broadcast error:", err);
    }
   
    console.log("hello");
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
                required
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
                required
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
                  required
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
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1">
                Post Bounty
              </Button>
              {/* <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save Draft
              </Button> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Postbounty;
