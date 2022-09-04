import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          blogId: "abcdef",
        },
      },
    
    ],
    fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/posts/${params.blogId}?format=json`
  );
  const data = await res.json();

  return {
    props: {
      post: data || null,
    },
    revalidate: 3
  };
};

const BlogPost = ({post}) => {
  const router = useRouter();
  const { blogId } = router.query;

  console.log({ router });

  if(router.isFallback) {
      return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default BlogPost;
