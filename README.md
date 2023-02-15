# Social-Network

User schema

const userCollectionSchema = Joi.object({
Name: Joi.string().max(50).default(null),
userName: Joi.string().default(null),
password: Joi.string().min(5).max(30).trim().default(null),
createdAt: Joi.date().timestamp().default(Date.now()),
updatedAt: Joi.date().timestamp().default(null),
email: Joi.string().required().email(),
mobile: Joi.string().default(null),
lastLogin: Joi.date().timestamp().default(null),
intro: Joi.string().default(null),
profile: Joi.string().default(null),
avatar: Joi.string().default(null),
authGoogleId: Joi.string().default(null),
authGithubId: Joi.string().default(null),
authType: Joi.string().valid("local", "google", "github").default("local"),
});

authentication API:

ĐĂNG KÝ (REGISTER): http://localhost:3240/v1/auth/register post
{
"Name": "Sang",
"userName" : "sangvip90",
"password" : "12345",
"email": "zimb240@gmail.com",
"authType" :"local"
}
Đăng Nhập (login) : http://localhost:3240/v1/auth/login post
{
"email": "zimb240@gmail.com",
"password": "12345"
}
Đăng Xuất (logout) : http://localhost:3240/v1/auth/logout post

RefreshToken : http://localhost:3240/v1/auth/refresh post

Đăng nhập qua google : http://localhost:3240/v1/auth/google get

Đăng nhập qua github : http://localhost:3240/v1/auth/github get

lấy thông tin user đã đăng nhập : http://localhost:3240/v1/auth/login/success (sài khi đnăg nhập qua google và github) get

user API
Tìm kiếm User : http://localhost:3240/v1/user/search/:userName

Post Schema :
const postCollectionSchema = Joi.object({
caption: Joi.string().required(),
ownerId: Joi.string().required(),
source: Joi.array()
.items({ type: Joi.string(), data: Joi.string(), filename: Joi.string() })
.default([]),
isVideo: Joi.boolean().required(),
reaction: Joi.array().items(Joi.string()).default([]),
commentCount: Joi.number().default(0),
createdAt: Joi.date().timestamp().default(Date.now()),
updatedAt: Joi.date().timestamp().default(Date.now()),
});

Post API :

Đăng post bằng hình ảnh : http://localhost:3240/v1/post/uploadImage post
Cần token
truyền vào theo form gồm
{
caption (string),
ownerId(string) ,
isVideo(boolean),
array file image
}

Đăng post kèm video : http://localhost:3240/v1/post/uploadVideo post
Cần token
truyền vào theo form gồm
{
caption (string),
ownerId(string) ,
isVideo(boolean),
file mp4
}

Cập nhật caption Post : http://localhost:3240/v1/post/updatePost/:id put
Cần token
{
"caption": "hao hao chua cay"
}

Xóa post : http://localhost:3240/v1/post/deletePost/:id put
cần token

tim bài post : http://localhost:3240/v1/post/reaction/:id post
Cần token

Comment Schema :
const commentCollectionSchema = Joi.object({
postId: Joi.string().required(),
senderId: Joi.string().required(),
content: Joi.string().required(),
isReply: Joi.boolean().required(),
replyId: Joi.string().default(null),
reaction: Joi.array().items(Joi.string()).default([]),
replyCount: Joi.number().default(0),
createdAt: Joi.date().timestamp().default(Date.now()),
updatedAt: Joi.date().timestamp().default(Date.now()),
});

Comment APi :

Comment : http://localhost:3240/v1/comment/create post
cần token
{
"postId" : "63e88fb49891e7d9449e0889",
"senderId" : "63e58ee5094127604659bb09",
"content" :"halo",
"isReply" : "false"
}

update content Comment : http://localhost:3240/v1/comment/update/:id put
cần token
{
"content" : "siuuu"
}

delete Comment : http://localhost:3240/v1/comment/delete/:id put
cần token

show comment of post : http://localhost:3240/v1/comment/showCommentOfPost/:id get

show reply comment : localhost:3240/v1/comment/showCommentReply/:id get

tim comment : localhost:3240/v1/comment/reaction/:id post
cần token
