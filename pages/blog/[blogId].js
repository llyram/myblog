import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { config } from '../../Constants';
const { endpoint } = require("@octokit/endpoint");
import Link from "next/link";



export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          blogId: "3",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  // var url = config.url.API_URL;
  // const res = await fetch(
  //   url.concat(`/api/posts/${params.blogId}?format=json`)
  // );
  // const data = await res.json();

  const { url, ...options } = endpoint('GET /repos/:owner/:repo/issues/:number', {
    owner: 'llyram',
    repo: 'myblog',
    number: params.blogId,
    auth: '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',
  })
  const response = await fetch(url, options)
  const issue = await response.json()
  console.log(issue)

  return {
    props: {
      post: issue || null,
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
    <div className="py-16 px-6 sm:px-8 mt-8 mx-auto prose md:prose-lg lg:prose-xl">
      <header>
        <div>
          <Link href="/">
            <a className="text-gray-600 hover:text-gray-800">
              {"\u2190"} Back to Home
            </a>
          </Link>
        </div>
        <h1 className="flex flex-col items-center">
          <span className="mt-2 text-4xl sm:text-7xl font-extrabold tracking-tight text-gray-900 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text sm:leading-relaxed">
            {post.title}
          </span>
        </h1>
      </header>
      <div className="">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
