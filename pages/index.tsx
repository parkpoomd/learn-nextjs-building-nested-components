import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useState } from "react";

interface Comment {
  id: number;
  body: string;
  comments: Comment[];
}

const dummyComments: Comment[] = [
  {
    id: 1,
    body: "This is comment 1",
    comments: [],
  },
  {
    id: 2,
    body: "This is comment 2",
    comments: [],
  },
  {
    id: 3,
    body: "This is comment 3",
    comments: [],
  },
];

export default function Home() {
  const [comments, setComments] = useState(dummyComments);

  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className={inter.className}>
      <div className="flex flex-col gap-6 h-screen w-screen p-6">
        <span className="text-3xl">React Nested Comments</span>
        <CommentInput onComment={onComment} />
        <div className="flex flex-col gap-4 mt-10">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    // setIsReplying(false);
  };

  return (
    <div
      key={comment.id}
      className="flex flex-col border border-zinc-500 rounded-md p-3 my-4"
    >
      <span>{comment.body}</span>
      {isReplying ? (
        <button
          className="border rounded-full border-zinc-400 w-20"
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </button>
      ) : (
        <button
          className="border rounded-full border-zinc-400 w-20"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </button>
      )}
      {isReplying && <CommentInput onComment={onComment} />}
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

interface CommentInputProps {
  onComment: (newComment: Comment) => void;
}

const CommentInput = ({ onComment }: CommentInputProps) => {
  const [commentBody, setCommentBody] = useState("");

  return (
    <div className="flex flex-col mt-4">
      <input
        type="text"
        value={commentBody}
        onChange={(event) => setCommentBody(event.target.value)}
        placeholder="What are your thoughts?"
        className="border border-zinc-400 p-4 w-3/4"
      />
      <button
        className="border rounded-full border-zinc-400 w-20"
        onClick={() => {
          onComment({ id: Date.now(), body: commentBody, comments: [] });
          setCommentBody("");
        }}
      >
        Comment
      </button>
    </div>
  );
};
