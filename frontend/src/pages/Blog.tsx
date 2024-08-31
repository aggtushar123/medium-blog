import { BlogDetails } from "../components/BlogDetails"
import { Spinner } from "../components/Spinner"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
export const Blog = () =>{
    const {id } = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })
    if(loading || !blog){
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner/>
            </div>
        </div>
    }
    return <div>
        <BlogDetails blog={blog}/>
    </div>
}