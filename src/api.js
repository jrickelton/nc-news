import axios from "axios";
const request = axios.create({
  baseURL: "https://jrickelton-nc-news-app.herokuapp.com/api",
});

export const fetchArticles = (topic, sortBy) => {
  return request
    .get("/articles", { params: { topic: topic, sort_by: sortBy } })
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

export const fetchComments = (articleId) => {
  return request.get(`/articles/${articleId}/comments`).then((res) => {
    return res.data.comments;
  });
};
