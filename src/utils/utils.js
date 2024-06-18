export const mostPopular = (articles) => {
    if(articles.length===0) return {}
    let mostPop = articles[0]
    for(const article of articles){
        if(article.votes > mostPop.votes){
            mostPop = article
        }
    }
    return mostPop
}

export const findUserAvatar = (username, users) => {
    const userMatched = users.find(user => user.username === username)
    return userMatched.avatar_url
}

