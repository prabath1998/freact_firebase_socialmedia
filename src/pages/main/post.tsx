/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Post as Ipost } from "./main";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: Ipost;
}

interface Like {
  likeId: string;
  userId: string;
}

const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);

  const { post } = props;
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <a
        style={{
          margin: "auto",
          width: "100%",
          marginTop: "8px",
        }}
        href="#"
        className="mt-4 block max-w-md w-full p-6 bg-orange-50 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.description}
        </p>
        <div className="footer">
          <p className="font-small text-gray-400 dark:text-gray-400">
            by {post.username}
          </p>
          <button onClick={hasUserLiked ? removeLike : addLike} className="p-4">
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
          {likes && <p>Likes: {likes?.length}</p>}
          {/* <button className="p-4">&#128078;</button> */}
        </div>
      </a>
    </div>
  );
};

export default Post;
