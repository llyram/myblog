import Link from "next/link";

const BlogCard = (post) => {
  const { title, intro, created_at, code } = post.post;
  return (
    <Link href={`/blog/${code}`}>
      <a className="block p-6 m-10 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
        <p className="font-normal text-gray-700 ">{intro}</p>
        <a className="text-gray-800">Read More...</a>
      </a>
    </Link>
  );
};

export default BlogCard;
