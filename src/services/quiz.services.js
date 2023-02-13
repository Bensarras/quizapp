import { db } from "../utils/firebase/firebase.utils";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
const quizCollectionRef = collection(db, "quiz");
const postCollectionRef = collection(db, "posts");
class PostDataService {
  addPosts = (newPost) => {
    return addDoc(quizCollectionRef, newPost);
  };

  updatePost = (id, updatedPost) => {
    const postDoc = doc(db, "quiz", id);
    return updateDoc(postDoc, updatedPost);
  };

  deletePost = (id) => {
    const postDoc = doc(db, "quiz", id);
    return deleteDoc(postDoc);
  };

  getAllPosts = () => {
    return getDocs(quizCollectionRef);
  };

  getPost = (id) => {
    const postDoc = doc(db, "quiz", id);
    return getDoc(postDoc);
  };
}

export default new PostDataService();