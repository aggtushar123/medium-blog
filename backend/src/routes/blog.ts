    import { createBlogInput, updateBlogInput } from "@aggtushar123/medium-common";
    import { PrismaClient } from "@prisma/client/edge";
    import { withAccelerate } from "@prisma/extension-accelerate";
    import { Hono } from "hono";
    import { verify } from "hono/jwt";

    export const blogRouter = new Hono<{
        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string
        }, 
        Variables: {
            userId: string;
        }
    }>()

    blogRouter.use('/*', async (c, next) => {
        const authHeader = c.req.header("authorization") || ""
        const payload = await verify(authHeader, c.env.JWT_SECRET)
        if(payload){
            //@ts-ignore
            c.set("userId", payload.id)
            await next()
        }else {
            c.status(403)
            return c.json({error: "unauthorized"})
        }
    })

        blogRouter.post('/', async (c) => {
            const body = await c.req.json()
            const authorId = c.get("userId")
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL
              }).$extends(withAccelerate())
            const {success} = createBlogInput.safeParse(body)
            if(!success){
                c.status(411)
                return c.json({
                    message: "Inputs not correct"
                })
            }
            try {
                const blog = await prisma.post.create({
                data:  {
                        title: body.title,
                        content: body.content,
                        authorId: authorId 
                }
                }) 
                return c.json({id: blog.id})
            } catch (error) {
                console.log(error)
                c.status(411)
                c.text('Error Posting Blog')
            }
        })
    
    
        blogRouter.put('/', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL
              }).$extends(withAccelerate())
            const body = await c.req.json()
            const {success} = updateBlogInput.safeParse(body)
            if(!success){
                c.status(411)
                return c.json({
                    message: "Inputs not correct"
                })
            }
            const blog = prisma.post.update({
                where: {
                    id: body.id
                },
                data : {
                    title: body.title,
                    content: body.content,
                }
            })
            return c.json({blog: blog})
        })
        

        blogRouter.get('/bulk', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL
              }).$extends(withAccelerate())

            const blogs = await prisma.post.findMany({
                select: {
                    content: true,
                    title: true,
                    id: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            return c.json({
                blogs
            })
        })
        
        blogRouter.get('/:id', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL
              }).$extends(withAccelerate())
            const id = c.req.param("id")
            try { 
                const blog = await prisma.post.findFirst({
                    where : {
                        id: id
                    },
                    select: {
                        id: true,
                        title: true,
                        content:true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    }
                })
                return c.json({
                    blog
                })
            } catch (error) {
                c.status(411)
                return c.json({
                    message: "Error while fetching blog post"
                })
            }
        })
    
    