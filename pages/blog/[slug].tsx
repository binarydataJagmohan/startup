import React from 'react';
import SingleBlog from '../../components/Frontend/Blog/SingleBlog';
import { getAllBlogs, getSingleBlogBySlug } from '../../lib/adminapi';

export default function SingleBlogPage({ singleblog, blog }: any) {
  return (
    <SingleBlog singleblog={singleblog} blog={blog} />
  );
}

export async function getServerSideProps({ params }: any) {
  const { slug } = params;

    const [singleblogdata, blogdata] = await Promise.all([
      getSingleBlogBySlug(slug),
      getAllBlogs()
    ]);

    if (!singleblogdata || !blogdata) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        singleblog: singleblogdata,
        blog: blogdata,
      },
    };
 
}
