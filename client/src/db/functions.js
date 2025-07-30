import { db, collection, addDoc,deleteDoc,doc,updateDoc,arrayUnion} from './firebase';

export async function saveOffchainBounty(data) {
  try {
    const docRef = await addDoc(collection(db, "bounties"), {
      title: data.title,
      description: data.description,
      githubRepo: data.githubRepo,
      priority: data.priority,
      createdAt: new Date().toISOString(),
      submittedPRs: []
    });

    return docRef.id; // <-- You’ll use this as `offchain-ref` in your smart contract
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e
  }
}


export async function deleteOffchainBounty(id){
  try {
    await deleteDoc(doc(db, "bounties", id)); // "bounties" is your collection name
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};



export async function submitPRForBounty(bountyId, prData) {
  try {
    // 1. Create PR document
    const prDocRef = await addDoc(collection(db, "prs"), {
      title: prData.title,
      description: prData.description,
      prLink: prData.prLink,
      submitterAddress: prData.submitterAddress,
      bountyId: bountyId, // Reference back to bounty
      status: "pending", // pending, accepted, rejected
      submittedAt: new Date().toISOString()
    });

    // 2. Add PR ID to bounty's submittedPRs array
    await updateDoc(doc(db, "bounties", bountyId), {
      submittedPRs: arrayUnion(prDocRef.id)
    });

    return prDocRef.id;
  } catch (error) {
    console.error("Error submitting PR:", error);
    throw error;
  }
}
