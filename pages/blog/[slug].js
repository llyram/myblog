import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { config } from '../../Constants';
const { endpoint } = require("@octokit/endpoint");
import Link from "next/link";



export const getStaticPaths = async () => {
  // Fetch the list of posts from the API
  const { url, ...options } = endpoint('GET /repos/:owner/:repo/issues', {
    owner: 'llyram',
    repo: 'myblog',
    state: 'open',
    auth: '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',
  })
  const response = await fetch(url, options)
  const issues = await response.json()

  // Generate the paths from the post slugs
  const paths = issues.map((issue) => {
    const slug = issue.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
      .slice(0, 50); // Trim to max length of 50 characters

    return {
      params: {
        slug: slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};


export const getStaticProps = async ({ params }) => {
  const { url, ...options } = endpoint('GET /repos/:owner/:repo/issues', {
    owner: 'llyram',
    repo: 'myblog',
    state: 'open',
    auth: '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',
  })
  const response = await fetch(url, options)
  const issues = await response.json()

  const post = issues.find((post) => {
    const postSlug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return postSlug === params.slug;
  });

  return {
    props: {
      post: post || null,
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
