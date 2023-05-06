import Link from "next/link";

const BlogCard = (post) => {
  const { title, body, created_at, number } = post.post;
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  console.log(formattedDate);

  return (
    <Link href={`/blog/${number}`}>
      <a className="block p-6 m-10 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
        <p className="font-normal text-gray-700 ">{formattedDate}</p>
        <a className="text-gray-800">Read More...</a>
      </a>
    </Link>
  );
};

export default BlogCard;
