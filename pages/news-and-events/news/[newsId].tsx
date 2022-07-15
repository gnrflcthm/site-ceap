import { useRouter } from 'next/router'

function NewsDetail(){
    const router = useRouter()
    const newsId = router.query.newsId
    return <h1>Details about news {newsId}</h1>
}

export default NewsDetail