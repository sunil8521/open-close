import { db, collection, addDoc } from './firebase';

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
