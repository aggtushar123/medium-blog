import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface Blog {
    "author": {
        "name": string,
    }
    "title": string,
    "content": string,
    "id": string
}

export const useBlog = ({id}: {id: string}) => {
    
    const [loading, setLoding] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog)
                setLoding(false)
            })

    }, [id])
    return {
        loading, blog
    }    
}

export const useBlogs = () => {

    const [loading, setLoding] = useState(true)
    const [blogs, setBlogs] = useState<Blog []>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs)
                setLoding(false)
            })
    }, [])
    return {
        loading, blogs
    }
}