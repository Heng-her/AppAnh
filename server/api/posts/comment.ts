interface Comment {
    comment_id: string;
    user_id: string;
    text: string;
    created_at: string;
  }
  
  interface Post {
    id: string;
    comments: Comment[];
    // Add other properties of the post here
  }
  
  interface PostsData {
    posts: Post[];
  }
  
  export default defineEventHandler(async (event) => {
    const authToken = getCookie(event, "auth_token");
    if (!authToken) return { success: false, message: "Not authenticated" };
  
    const body = await readBody(event);
    const { post_id, text } = body;
  
    // Cast the result to the expected type
    const posts = (await useStorage().getItem("posts.json") as PostsData) || { posts: [] };
  
    const post = posts.posts.find((p) => p.id === post_id);
  
    if (!post) return { success: false, message: "Post not found" };
  
    const newComment = {
      comment_id: Date.now().toString(),
      user_id: authToken,
      text,
      created_at: new Date().toISOString()
    };
  
    post.comments.push(newComment);
    await useStorage().setItem("posts.json", posts);
  
    return { success: true, message: "Comment added" };
  });