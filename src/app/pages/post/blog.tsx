import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (router.isReady) {
      // Simulate fetching the post based on the ID
      const posts = [
        { id: 1, title: "First Post", content: "This is the first post." },
        { id: 2, title: "Second Post", content: "This is the second post." },
        { id: 3, title: "Third Post", content: "This is the third post." },
      ];
      const foundPost = posts.find((p) => p.id === parseInt(id as string, 10));
      setPost(foundPost || null);
    }
  }, [router.isReady, id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
