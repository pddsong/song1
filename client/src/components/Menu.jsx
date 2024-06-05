import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

// eslint-disable-next-line react/prop-types
function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(`/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className="menu">
      <h1>猜你喜欢的帖子🧡</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
