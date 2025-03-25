interface Reaction {
    like: string[];
    love: string[];
    sad: string[];
    angry: string[];
  }
  
  interface Post {
    id: string;
    reactions: Reaction;
    // Add other properties of the post here
  }
  
  interface PostsData {
    posts: Post[];
  }
  
  export default defineEventHandler(async (event) => {
    const authToken = getCookie(event, "auth_token");
    if (!authToken) return { success: false, message: "Not authenticated" };
  
    const body = await readBody(event);
    const { post_id } = body;
  
    // Cast the result to the expected type
    const posts = (await useStorage().getItem("posts.json") as PostsData) || { posts: [] };
  
    const post = posts.posts.find((p) => p.id === post_id);
  
    if (!post) return { success: false, message: "Post not found" };
  
    if (!post.reactions.like.includes(authToken)) {
      post.reactions.like.push(authToken);
    }
  
    await useStorage().setItem("posts.json", posts);
    return { success: true, message: "Post liked" };
  });