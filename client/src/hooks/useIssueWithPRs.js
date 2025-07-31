import { useState, useCallback, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
export const useIssueWithPRs = (id) => {
  const [issue, setIssue] = useState(null);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "bounties", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setIssue(null);
        setPrs([]);
        return;
      }

      const issueData = docSnap.data();
      setIssue(issueData);

      const valArr = issueData.submittedPRs || [];

      const prPromises = valArr.map(async (prId) => {
        const prDocRef = doc(db, "prs", prId);
        const prDocSnap = await getDoc(prDocRef);
        return prDocSnap.exists()
          ? { id: prDocSnap.id, ...prDocSnap.data() }
          : null;
      });

      const results = await Promise.all(prPromises);
      const filtered = results.filter(Boolean);
      setPrs(filtered);
    } catch (error) {
      console.error("Failed to fetch issue or PRs", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    issue,
    prs,
    loading,
    refetch: fetchData,
  };
};
