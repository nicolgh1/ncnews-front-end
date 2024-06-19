import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://connecting-people-nc.onrender.com/api",
});

export const getAllArticles = (filterOptions) => {
    return ncApi.get('/articles',{params: filterOptions}).then((respose) => {
        return respose.data
    }).catch((err)=> {
        console.log(err,'in api')
    })
}

export const getTopics = () => {
    return ncApi.get('/topics').then((respose) => {
        return respose.data
    }).catch((err)=> {
        console.log(err,'in api')
    })
}

export const getTopThreeArticlesPerTopic = (topic) => {
    return ncApi.get('/articles', {params: {topic: topic, sort_by: 'votes', order: 'desc', limit:3}}).then((respose) => {
        return respose.data
    }).catch((err)=> {
        console.log(err,'in api')
    }) 
}

export const updateVotes = (article_id) => {
    return ncApi.patch(`/articles/${article_id}`, {inc_votes: 1}).then((respose)=> {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const getArticleById = (article_id) => {
    return ncApi.get(`/articles/${article_id}`).then((respose)=> {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const getArticleComments = (article_id) => {
    return ncApi.get(`/articles/${article_id}/comments`).then((respose)=> {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const getAllUsers = () => {
    return ncApi.get('/users').then((respose)=>{
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const updateCommentVotes = (comment_id) => {
    return ncApi.patch(`/comments/${comment_id}`, {inc_votes: 1}).then((respose)=> {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const getUserById = (username) => {
    return ncApi.get(`/users/${username}`).then((respose) => {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const postComment = (article_id,commentInput,username) => {
    return ncApi.post(`/articles/${article_id}/comments`,{
        author: username,
        body: commentInput
    }).then((respose) => {
        return respose.data
    }).catch((err)=> {
        console.log(err)
    })
}

export const deleteComment = (comment_id) => {
    return ncApi.delete(`/comments/${comment_id}`).catch((err)=>{
        console.log(err)
    })
}