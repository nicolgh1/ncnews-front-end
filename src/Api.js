import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://connecting-people-nc.onrender.com/api",
});

export const getAllArticles = (filterOptions) => {
    return ncApi.get('/articles',{params: filterOptions}).then((respose) => {
        return respose.data
    })
}

export const getTopics = () => {
    return ncApi.get('/topics').then((respose) => {
        return respose.data
    })
}


export const updateVotes = (article_id) => {
    return ncApi.patch(`/articles/${article_id}`, {inc_votes: 1}).then((respose)=> {
        return respose.data
    })
}

export const getArticleById = (article_id) => {
    return ncApi.get(`/articles/${article_id}`).then((respose)=> {
        return respose.data
    })
}

export const getArticleComments = (article_id) => {
    return ncApi.get(`/articles/${article_id}/comments`).then((respose)=> {
        return respose.data
    })
}

export const getAllUsers = () => {
    return ncApi.get('/users').then((respose)=>{
        return respose.data
    })
}

export const updateCommentVotes = (comment_id) => {
    return ncApi.patch(`/comments/${comment_id}`, {inc_votes: 1}).then((respose)=> {
        return respose.data
    })
}

export const getUserById = (username) => {
    return ncApi.get(`/users/${username}`).then((respose) => {
        return respose.data
    })
}

export const postComment = (article_id,commentInput,username) => {
    return ncApi.post(`/articles/${article_id}/comments`,{
        author: username,
        body: commentInput
    }).then((respose) => {
        return respose.data
    })
}

export const deleteComment = (comment_id) => {
    return ncApi.delete(`/comments/${comment_id}`)
}