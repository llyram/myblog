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
    fallback: true,
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
    revalidate: 3,
  };
};

const BlogPost = ({ post }) => {
  const router = useRouter();
  const { blogId } = router.query;

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="py-16 px-6 sm:px-8">
      <header>
        <h1 className="flex flex-col items-center">
          <span className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{post.title}</span>
        </h1>
      </header>
      <div className="mt-8 mx-auto prose md:prose-lg lg:prose-xl">
        <ReactMarkdown children={post.body}></ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
