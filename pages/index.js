import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Stories from "../components/Stories";
import Widget from "../components/Widget";
import { db } from "../firebase";
export default function Home({ session, posts }) {
  if (!session) {
    return <Login />;
  }
  return (
    <div className="h-screen bg-gray-200 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widget />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => {
    return { id: post.id, ...post.data(), timestamp: null };
  });
  return {
    props: {
      session,
      posts: docs,
    },
  };
}
