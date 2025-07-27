import { db, collection, addDoc,deleteDoc,doc} from './firebase';

export async function saveOffchainBounty(data) {
  try {
    const docRef = await addDoc(collection(db, "bounties"), {
      title: data.title,
      description: data.description,
      githubRepo: data.githubRepo,
      priority: data.priority,
      deadline: data.deadline,
      createdAt: new Date().toISOString()
    });

    return docRef.id; // <-- You’ll use this as `offchain-ref` in your smart contract
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function deleteOffchainBounty(id){
  try {
    await deleteDoc(doc(db, "bounties", id)); // "bounties" is your collection name
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

