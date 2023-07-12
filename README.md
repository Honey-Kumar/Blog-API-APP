# Blog_App_API



 <h1 class="text-align: center">Blog App API</h1>
    This Blog API can be used to create a full Stack Blog App. In this all the crud Operations are Included.
    <h2>Steps to Use This Api</h2>
    Must Use Any Api fetcher tool like Postman, Insomnia etc to fetch Crud Operations like POST, PUT, DELETE AND GET.
    Although Get method will randomly work but still to use another methode you will need tools to give input
    <h3>API FEAUTRES</h3>
    <ul>User Routes</ul>
    <li>
        <strong>Register as User</strong> To register as user use '/register' to get register on Blog and its a post
        request <br>
        <span><strong>For Example</strong>
            To register i have given input and get register
            <br>
            <pre>
                {
                    "name" : "temp",
                    "email" : "temp@gmail.com",
                    "password" : "temp@gmail.com",
                    "avatar" : {
                    "public_id" : "temp",
                    "url" : "temp"
                    }
                    }
            </pre>
        </span>
        <h3>Output of Successfull Registration</h3>
        <pre>
                {
                    "message": "User is Created Successfully",
                    "verifieduser": {
                        "name": "temp",
                        "email": "temp@gmail.com",
                        "password": "$2b$10$6CUkiB0xLSJ2qkHsycabpu3iLKufWhAKyNeNOluu1uYD6nhwe.aKi",
                        "avatar": {
                            "public_id": "temp",
                            "url": "temp"
                        },
                        "role": "User",
                        "_id": "64ad020d12b317c7731b30bd",
                        "createdAt": "2023-07-11T07:17:33.879Z",
                        "updatedAt": "2023-07-11T07:17:33.879Z",
                        "__v": 0
                    }
                }
            </pre>
    </li>
    <li>
        <strong>To login </strong> To Login Use Route '/login' and its a post request
        <br><span>For Example</span>
        Input
        <br>
        <pre>
            {
                "email" : "Ramlal@gmail.com", 
                "password" : "Ramlal@gmail.com"
            }
        </pre>
        Out after Successfull Login
        <pre>
            {
                "message": "User Login Successfully",
                "finduser": {
                    "_id": "64ac476f37b8cb986ab9817a",
                    "name": "Ramlal",
                    "email": "Ramlal@gmail.com",
                    "password": "$2b$10$A2il3phyLr7M/bWFAr8Mk.oN4WpWA96qMJan.7O/mqqkjoL5s8DPa"
                }
            }
        </pre>
    </li>
    <li>
        <strong>To Logout</strong> To Logout use route '/logout' and its a post request
        <br><span>For Example</span>
        <pre>
            http://localhost:5000/logout
        </pre>
        Output
        <pre>
            {
                "message": "User Logout Successfully"
            }
        </pre>
    </li>
    <li>
        <strong> Delete a User</strong> to delete use '/user/delete' route and it is a delete request
        <br><span>For Example</span>
        <pre>
            http://localhost:5000/user/delete
        </pre>
        <pre>
            {
                "message": "User Deleted Successfully"
            }
        </pre>
    </li>
    <br><br><br><br><br>
    <ul>Blog Routes</ul>
    <ul>
        <strong>Create a Blog</strong> it is a protected route which can be onlt accessed by the Author and it is post
        request
        to use this use '/CreateBlog'
        <br>
        <span>For Example</span>
        <pre>
            {
                "title" : "First New Blog Post",
                "content" : "My First New Blog Post is here. I posed recently on My Blog Website",
                "author" : "64ac476f37b8cb986ab9817a",
                "image" : [{
                    "public_id" : "First new Blog Post",
                    "url" : "First new Blog post"
                }],
                "keywords" : ["First new blog"],
                "category" : ["First New Blog Post For Blog App"],
                "Comments" : [{
                    "name" : "First",
                    "rating" : 4,
                    "Comment" : "Nice"
                }]
            }
        </pre>
        out after creation
        <pre>
            {
                "message": "Blog Post Created Successfully"
            }
        </pre>
    </ul>
    <ul>
        <strong>Add Comment on Blog</strong> to comment on a blog post use route '/post/:id' <br> Example
        '/posts/64acf49da6398a92c14539f1' and its a post request <br>this routes can do two task collectively one is
        create a new comment and second is if comment is already created then to update that comment
        <br><span>For Example</span>
        <pre>
            {
                "name" : "Angel",
                "rating" : 4,
                "Comment" : "Very Nice Post"
            }
        </pre>
        out after comment creation
        <pre>
            {
                "message": "Comment Added Successfully",
                "newComment": {
                    "name": "Angel",
                    "rating": 4,
                    "Comment": "Very Nice Post",
                    "createdBy": "64abf7ae9f6002d2af76da15"
                },
                "added": true
            }
        </pre>
    </ul>
    <ul>
        <strong>Get Blog detail by Blod Id</strong> To get detail of single blog use this route '/posts/:id' <br>example
        '/posts/64acf9ed4a1ac8ca60f4d0e5' and its a get request
        <br> for example <br>
        <pre>
            http://localhost:5000/posts/64acf9ed4a1ac8ca60f4d0e5        </pre>
        out put
        <pre>
            {
                "_id": "64acf49da6398a92c14539f1",
                "title": "Second Updated New Blog Post",
                "content": "My Second Updated New Blog Post is here. I posed recently on My Blog Website",
                "author": {
                    "_id": "64ac476f37b8cb986ab9817a",
                    "name": "Ramlal",
                    "email": "Ramlal@gmail.com"
                },
                "image": [
                    {
                        "public_id": "Second Updated new Blog Post",
                        "url": "Second new Blog post",
                        "_id": "64ad196da51478d734a5cc9f"
                    }
                ],
                "keywords": [
                    "Second new blog"
                ],
                "category": [
                    "Second New Blog Post For Blog App"
                ],
                "totalrating": 4,
                "Comments": [
                    {
                        "name": "Angel",
                        "rating": 4,
                        "Comment": "Very Nice Post",
                        "createdBy": "64abf7ae9f6002d2af76da15",
                        "_id": "64acfa2b4a1ac8ca60f4d0f2"
                    }
                ],
                "CreatedAt": "2023-07-11T06:20:13.885Z",
                "createdAt": "2023-07-11T06:20:13.911Z",
                "updatedAt": "2023-07-11T08:57:17.800Z",
                "__v": 1,
                "totalViews": 5
            }
        </pre>
    </ul>
    <ul>
        <strong>Delete a Blog Post</strong> This is a protected route which can only be accessible by the Blog Author .
        to use this route 'http://localhost:5000/posts/64acf49da6398a92c14539f1' use '/posts/:id' and its a delete route
        <br> For EExample <br>
        <pre>
            http://localhost:5000/posts/64acf49da6398a92c14539f1
        </pre>
        Output
        <pre>
            {
                "message": "Blog post deleted successfully"
            }
        </pre>
    </ul>
    <ul>
        <strong>Update Blog Post</strong> Again it is a protected route which can only be accessible by the blog Author
        . to use this use 'http://localhost:5000/posts/64acf49da6398a92c14539f1' use '/posts/:id' and its a put request
        <br> For Example <br>
        <pre>
            {
                "title" : "Second Updated New Blog Post",
                "content" : "My Second Updated New Blog Post is here. I posed recently on My Blog Website",
                "author" : "64ac476f37b8cb986ab9817a",
                "image" : [{
                    "public_id" : "Second Updated new Blog Post",
                    "url" : "Second new Blog post"
                }],
                "keywords" : ["Second new blog"],
                "category" : ["Second New Blog Post For Blog App"],
                "Comments" : [{
                    "name" : "Sumit",
                    "rating" : 4,
                    "Comment" : "Nice"
                }]
            }
        </pre>
        out put of updation
        <pre>
            {
                "message": "Blog Post Updated Successfully"
            }
        </pre>
    </ul>
    <ul>
        <strong>Get All Comment of A blog post</strong> this is a get request . to use this route use
        '/posts/comment/:id' <br>for example <br>'http://localhost:5000/posts/comment/64acf9ed4a1ac8ca60f4d0e5'
        <br>
        for example of <br>
        <pre>
            http://localhost:5000/posts/comment/64acf9ed4a1ac8ca60f4d0e5
        </pre>
        output
        <pre>
            {
                "message": "All Comments found",
                "allcomment": [
                    {
                        "name": "Angel",
                        "rating": 4,
                        "Comment": "Very Nice Post",
                        "createdBy": "64abf7ae9f6002d2af76da15",
                        "_id": "64acfa134a1ac8ca60f4d0ec"
                    }
                ]
            }
        </pre>
    </ul>
    <ul>
        <strong>
            Become a Author from User
        </strong> to use this route use '/user/:id' and its is put request <br>for example
        <br>http://localhost:5000/user/64abf7ae9f6002d2af76da15
        <br>
        Route example
        <br>
        <pre>
            http://localhost:5000/user/64abf7ae9f6002d2af76da15
        </pre>
        output of successfully transformation
        <br>
        <pre>
            {
                "message": "You are Successfully registered as Author",
                "getuser": {
                    "avatar": {
                        "public_id": "rohan",
                        "url": "rohan"
                    },
                    "_id": "64abf7ae9f6002d2af76da15",
                    "name": "Kamal",
                    "email": "Kamal@gmail.com",
                    "role": "Author",
                    "createdAt": "2023-07-10T12:21:02.784Z",
                    "updatedAt": "2023-07-11T06:30:17.021Z",
                    "__v": 0
                }
            }
        </pre>
    </ul>
    <ul><strong>Read all Blog Post </strong></ul> This is a get request . this request show all the blog post to read
    <br>to use this
    route use '/posts' <br>for example <br>http://localhost:5000/posts
    route example <br>
    <pre>
        http://localhost:5000/posts
    </pre>
    output
    <br>
    <pre>
        [
	{
		"totalViews": 0,
		"_id": "64acf9ed4a1ac8ca60f4d0e5",
		"title": "Second New Blog Post",
		"content": "My Second New Blog Post is here. I posed recently on My Blog Website",
		"author": {
			"_id": "64ac476f37b8cb986ab9817a",
			"name": "Ramlal",
			"email": "Ramlal@gmail.com"
		},
		"image": [
			{
				"public_id": "Second new Blog Post",
				"url": "Second new Blog post",
				"_id": "64acf9ed4a1ac8ca60f4d0e6"
			}
		],
		"keywords": [
			"Second new blog"
		],
		"category": [
			"Second New Blog Post For Blog App"
		],
		"totalrating": 4,
		"Comments": [
			{
				"name": "Angel",
				"rating": 4,
				"Comment": "Very Nice Post",
				"createdBy": {
					"_id": "64abf7ae9f6002d2af76da15",
					"name": "Kamal",
					"email": "Kamal@gmail.com"
				},
				"_id": "64acfa134a1ac8ca60f4d0ec"
			}
		],
		"CreatedAt": "2023-07-11T06:42:53.701Z",
		"createdAt": "2023-07-11T06:42:53.724Z",
		"updatedAt": "2023-07-11T06:43:31.526Z",
		"__v": 1
	},
	{
		"_id": "64ad2095cafc49952d11811e",
		"title": "First New Blog Post",
		"content": "My First New Blog Post is here. I posed recently on My Blog Website",
		"author": {
			"_id": "64ac476f37b8cb986ab9817a",
			"name": "Ramlal",
			"email": "Ramlal@gmail.com"
		},
		"image": [
			{
				"public_id": "First new Blog Post",
				"url": "First new Blog post",
				"_id": "64ad2095cafc49952d11811f"
			}
		],
		"keywords": [
			"First new blog"
		],
		"category": [
			"First New Blog Post For Blog App"
		],
		"totalrating": 0,
		"totalViews": 0,
		"Comments": [],
		"CreatedAt": "2023-07-11T09:27:49.746Z",
		"createdAt": "2023-07-11T09:27:49.770Z",
		"updatedAt": "2023-07-11T09:27:49.770Z",
		"__v": 0
	},
	{
		"_id": "64ad2d046a2d4beb96af9ae7",
		"title": "third New Blog Post",
		"content": "My third New Blog Post is here. I posed recently on My Blog Website",
		"author": {
			"_id": "64ac476f37b8cb986ab9817a",
			"name": "Ramlal",
			"email": "Ramlal@gmail.com"
		},
		"image": [
			{
				"public_id": "third new Blog Post",
				"url": "third new Blog post",
				"_id": "64ad2d046a2d4beb96af9ae8"
			}
		],
		"keywords": [
			"third new blog"
		],
		"category": [
			"third New Blog Post For Blog App"
		],
		"totalrating": 0,
		"totalViews": 0,
		"Comments": [],
		"CreatedAt": "2023-07-11T10:20:52.376Z",
		"createdAt": "2023-07-11T10:20:52.387Z",
		"updatedAt": "2023-07-11T10:20:52.387Z",
		"__v": 0
	}
]
    </pre>
    <h3>All routes has been described use it</h3>
    <h2>After Deployment User this main route instead of Localhost:5000 <br/> 'https://blog-api-app.onrender.com/'</h2>
