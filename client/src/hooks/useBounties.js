import {
  fetchCallReadOnlyFunction,
  cvToValue,
  uintCV,
} from "@stacks/transactions";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { useState, useCallback, useEffect ,useRef} from "react";
const CACHE_DURATION = 5 * 60 * 1000; 
const cache = {
  allBounties: { data: null, timestamp: null },
  userBounties: new Map(), 
};

const contractAddress = "ST24PT28CZ0M6PKFWRNMTHVQSF8ZKCFQ6EEBGM2AP";
const contractName = "bounty";

const isCacheValid = (timestamp) => {
  return timestamp && Date.now() - timestamp < CACHE_DURATION;
};

const fetchBountyData = async (bountyId) => {
  const res = await fetchCallReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: "get-bounty",
    functionArgs: [uintCV(bountyId)],
    senderAddress: contractAddress,
    network: "testnet",
  });

  const b = cvToValue(res);
  const refId = b.value["offchain-ref"].value;
  const owner = b.value["owner"].value;
  const reward = b.value["reward"].value;
  const status = b.value["status"].value;

  const docRef = doc(db, "bounties", refId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: refId,
      owner,
      reward,
      status,
      bountyId,
      ...docSnap.data(),
    };
  }
  return null;
};

// Main hook
export const useBounties = (userAddress = null) => {
  const [allBounties, setAllBounties] = useState([]);
  const [userBounties, setUserBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentRequestRef = useRef(null);

  const fetchAllBounties = useCallback(async () => {
    if (isCacheValid(cache.allBounties.timestamp)) {
      setAllBounties(cache.allBounties.data);
      return cache.allBounties.data;
    }

    const requestId = Date.now();
    currentRequestRef.current = requestId;

    try {
      const response = await fetchCallReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: "get-bounty-counter",
        functionArgs: [],
        senderAddress: contractAddress,
        network: "testnet",
      });

      const balance = cvToValue(response);
      const total = parseInt(balance.value);
      const bountyData = [];
      const batchSize = 10;
      for (let i = 1; i <= total; i += batchSize) {
        if (currentRequestRef.current !== requestId) {
          return; // Request was superseded
        }

        const batch = [];
        const endIndex = Math.min(i + batchSize - 1, total);

        for (let j = i; j <= endIndex; j++) {
          batch.push(fetchBountyData(j));
        }

        const batchResults = await Promise.all(batch);
        const validResults = batchResults.filter((bounty) => bounty !== null);
        bountyData.push(...validResults);
      }

      if (currentRequestRef.current === requestId) {
        // Update cache
        cache.allBounties = {
          data: bountyData,
          timestamp: Date.now(),
        };

        setAllBounties(bountyData);
        return bountyData;
      }
    } catch (err) {
      if (currentRequestRef.current === requestId) {
        console.error("Error fetching all bounties:", err);
        setError(err);
      }
    }
  }, []);

  // Fetch user-specific bounties
  const fetchUserBounties = useCallback(
    async (address) => {
      if (!address) {
        setUserBounties([]);
        return [];
      }

      // Check cache first
      const userCache = cache.userBounties.get(address);
      if (userCache && isCacheValid(userCache.timestamp)) {
        setUserBounties(userCache.data);
        return userCache.data;
      }

      // Get all bounties first (from cache or fetch)
      let allBountiesData = cache.allBounties.data;
      if (!isCacheValid(cache.allBounties.timestamp)) {
        allBountiesData = await fetchAllBounties();
      }

      // Filter user's bounties
      const userBountiesData = allBountiesData.filter(
        (bounty) => bounty.owner === address
      );

      // Update user cache
      cache.userBounties.set(address, {
        data: userBountiesData,
        timestamp: Date.now(),
      });

      setUserBounties(userBountiesData);
      return userBountiesData;
    },
    [fetchAllBounties]
  );

  // Main effect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userAddress) {
          // Fetch user-specific bounties
          await fetchUserBounties(userAddress);
        } else {
          // Fetch all bounties
          await fetchAllBounties();
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userAddress, fetchAllBounties, fetchUserBounties]);

  // Refresh function to force reload
  const refresh = useCallback(async () => {
    // Clear relevant cache
    if (userAddress) {
      cache.userBounties.delete(userAddress);
    } else {
      cache.allBounties = { data: null, timestamp: null };
      cache.userBounties.clear();
    }

    // Refetch data
    setLoading(true);
    try {
      if (userAddress) {
        await fetchUserBounties(userAddress);
      } else {
        await fetchAllBounties();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userAddress, fetchAllBounties, fetchUserBounties]);

  const clearCache = useCallback(() => {
    cache.allBounties = { data: null, timestamp: null };
    cache.userBounties.clear();
  }, []);

  return {
    bounties: userAddress ? userBounties : allBounties,
    allBounties,
    userBounties,
    loading,
    error,
    refresh,
    clearCache,
    // Helper functions
    getUserBounties: (address) => {
      const userCache = cache.userBounties.get(address);
      return userCache && isCacheValid(userCache.timestamp)
        ? userCache.data
        : null;
    },
  };
};
