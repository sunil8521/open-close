import React from 'react'



import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, Send } from "lucide-react"
import {useSelector} from "react-redux"

export function SubmitFix({ bountyTitle, bountyId,owner }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
    const { address,  } = useSelector((state) => state.wallet);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubPR: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Submitted fix:", { bountyId, ...formData })

    // Reset form and close dialog
    setFormData({
      title: "",
      description: "",
      githubPR: "",
    })
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        <Button className="w-full" size="lg" disabled={address==owner}>
          <Github className="h-4 w-4 mr-2" />
          {address==owner?"You can't Submit your own issue":"Submit Fix"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Your Fix</DialogTitle>
          <DialogDescription>
            Submit your bug fix for: <span className="font-medium">{bountyTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              placeholder="Brief description of the vulnerability you found"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1"
              required
            />
          </div>



          <div>
            <Label htmlFor="description">Vulnerability Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the vulnerability, its impact, and how it works..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="githubPR">GitHub Pull Request URL</Label>
            <Input
              id="githubPR"
              type="url"
              placeholder="https://github.com/username/repository/pull/123"
              value={formData.githubPR}
              onChange={(e) => setFormData({ ...formData, githubPR: e.target.value })}
              className="mt-1"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Create a pull request with your fix and paste the URL here</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Submitting..." : "Submit Fix"}
            </Button>
          
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export default SubmitFix
