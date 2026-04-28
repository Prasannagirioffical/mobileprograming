import React, { createContext, useContext, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const initialPosts = [
  {
    id: "1",
    title: "Black Wallet",
    location: "Kathmandu",
    date: "March 4, 2026",
    subtitle: "Kathmandu, Mar 4",
    description: "A black wallet was found near the bus stop.",
    imageKey: "wallet",
    phoneNumber: "9800000001",
    postType: "found",
    isMine: false
  },
  {
    id: "2",
    title: "School Bag",
    location: "Kathmandu",
    date: "March 7, 2026",
    subtitle: "Kathmandu, Mar 7",
    description: "Blue school bag found close to the market area.",
    imageKey: "bag",
    phoneNumber: "9800000002",
    postType: "found",
    isMine: false
  },
  {
    id: "3",
    title: "Watch",
    location: "Kathmandu",
    date: "March 7, 2026",
    subtitle: "Kathmandu, Mar 7",
    description:
      "I found this watch today and tried to hand it into the library. But they cannot take it unless it was found in the library.",
    imageKey: "watch",
    phoneNumber: "9800000003",
    postType: "found",
    isMine: false
  }
];

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isFirestoreReady, setIsFirestoreReady] = useState(false);

  React.useEffect(() => {
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const firestorePosts = snapshot.docs.map((postDoc) => ({
          id: postDoc.id,
          ...postDoc.data()
        }));
        const firestoreIds = new Set(firestorePosts.map((post) => post.id));
        const basePosts = initialPosts.filter((post) => !firestoreIds.has(post.id));

        // Keep existing items and put newly added Firestore posts on top.
        setPosts([...firestorePosts, ...basePosts]);
        setIsFirestoreReady(true);
      },
      (error) => {
        console.log("Firestore connection failed, using local fallback:", error?.message);
        setPosts(initialPosts);
      }
    );

    return () => unsubscribe();
  }, []);

  const addPost = async (post) => {
    try {
      await addDoc(collection(db, "posts"), {
        ...post,
        createdAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.log("Failed to add post:", error?.message);
      return false;
    }
  };

  const updatePost = async (postId, updatedData) => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.log("Failed to update post:", error?.message);
      return false;
    }
  };

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      return true;
    } catch (error) {
      console.log("Failed to delete post:", error?.message);
      return false;
    }
  };

  const value = useMemo(
    () => ({ posts, addPost, updatePost, deletePost, isFirestoreReady }),
    [posts, isFirestoreReady]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used inside PostsProvider");
  }

  return context;
}
