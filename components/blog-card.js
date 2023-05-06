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
      <div className="block p-6 m-10 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer">
        <p className="mb-0 mt-0 font-normal text-gray-700 ">{formattedDate}</p>
        <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 underline-none">
          {title}
        </h5>
        <a className="text-gray-800">Read More...</a>
      </div>
    </Link>
  );
};

export default BlogCard;
