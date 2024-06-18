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
