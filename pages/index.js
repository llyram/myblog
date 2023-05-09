import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { config } from '../Constants';
const BlogCard = dynamic(() => import("../components/blog-card"), {
  ssr: false,
});
const { endpoint } = require("@octokit/endpoint");

export const getStaticProps = async () => {

  const { url, ...options } = endpoint('GET /repos/:owner/:repo/issues', {
    owner: 'llyram',
    repo: 'myblog',
    auth: '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',
  })
  const response = await fetch(url, options)
  const issues = await response.json()

  return {
    props: {
      posts: issues || null,
    },
  };
};



const Home = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Marylls Dev Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto prose">
        <h1 className="text-9xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text leading-relaxed">The Blog</h1>
        {posts && posts.map((post, index) => (
          <BlogCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
