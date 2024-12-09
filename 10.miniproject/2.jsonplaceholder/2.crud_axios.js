const axios = require("axios");

// 특정 사용자의 게시글
const userId = 1;
const getUserPosts = async () => {
  const postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await axios.get(postUrl);

  console.log("1번 유저의 포스팅: ", response.data);
};

const getPostComments = async (postId) => {
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  const response = await axios.get(commentUrl);
  //   console.log(`게시글 ${postId}의 코멘트(전체): `, response.data);

  const comments = response.data;

  // 데이터 가공
  comments.forEach((comment) => {
    console.log("comment 제목:", comment.name);
    console.log("comment 내용:", comment.body);
    console.log("");
  });
};

// getUserPosts();
getPostComments(2);
