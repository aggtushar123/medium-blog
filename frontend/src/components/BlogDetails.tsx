import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const BlogDetails = ({ blog } : {blog:Blog}) => {
    return <div>
            <Appbar/>
    <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-10">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500">
                    Posted on 2nd dec 2902
                </div>
                <div className=" pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-slate-600">
                Author
                </div>
                <div className="flex">
                    <div className="pr-2 flex flex-col justify-center">
                        <Avatar size={10} name = {blog.author.name || "Anonymous"} />
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}   
                        </div>
                        <div className="pt-2 text-slate-500">
                            Random catch phrase about the author's ability to grab the user's attention
                        </div>   
                    </div>
                </div>
            </div>      
        </div>
    </div>
    </div>
}