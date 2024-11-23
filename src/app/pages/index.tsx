import { useRouter } from "next/router";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

const posts: Post[] = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
  { id: 3, title: "Third Post", content: "This is the third post." },
];

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const post = posts.find((p) => p.id === parseInt(id as string));

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!post) {
    return <div className="p-6">Post not found.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow p-6 rounded">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.content}</p>

        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <ul className="space-y-2 mb-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded">
                {comment}
              </li>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </ul>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
