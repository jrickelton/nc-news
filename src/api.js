import axios from "axios";
const request = axios.create({
  baseURL: "https://jrickelton-nc-news-app.herokuapp.com/api",
});

export const fetchArticles = (topic, sortBy, username) => {
  return request
    .get("/articles", {
      params: { topic: topic, sort_by: sortBy, author: username },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const fetchTopics = () => {
  return request.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const fetchArticle = (articleId) => {
  return request.get(`/articles/${articleId}`).then((res) => {
    return res.data.article[0];
  });
};

export const fetchComments = (articleId, sortBy) => {
  return request
    .get(`/articles/${articleId}/comments`, { params: { sort_by: sortBy } })
    .then((res) => {
      return res.data.comments;
    });
};

export const postComment = (articleId, commentBody, username) => {
  return request
    .post(`articles/${articleId}/comments`, {
      body: commentBody,
      username: username,
    })
    .then((res) => {
      return res.data.comment[0];
    });
};

export const deleteComment = (commentId) => {
  return request.delete(`comments/${commentId}`).then((res) => {
    return commentId;
  });
};

export const patchArticleVotes = (articleId, vote) => {
  return request
    .patch(`articles/${articleId}`, { inc_votes: vote })
    .then((res) => {
      return res.data;
    });
};

export const patchCommentVotes = (commentId, vote) => {
  return request
    .patch(`comments/${commentId}`, { inc_votes: vote })
    .then((res) => {
      return res.data;
    });
};

export const fetchUser = (username) => {
  return request.get(`users/${username}`).then((res) => {
    return res.data.user[0];
  });
};
