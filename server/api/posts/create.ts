interface Post {
    id: string;
    user_id: string;
    content: string;
    media: string;
    type: string;
    created_at: string;
    reactions: { like: string[]; love: string[]; sad: string[]; angry: string[] };
    comments: any[]; // Adjust the type according to your needs
    shares: any[]; // Adjust the type according to your needs
  }
  
  interface PostsData {
    posts: Post[];
  }
  
  export default defineEventHandler(async (event) => {
    const authToken = getCookie(event, "auth_token");
    if (!authToken) return { success: false, message: "Not authenticated" };
  
    const body = await readBody(event);
    const { content, media, type } = body;
  
    // Cast the result to the expected type
    const posts = (await useStorage().getItem("posts.json") as PostsData) || { posts: [] };
  
    const newPost = {
      id: Date.now().toString(),
      user_id: authToken,
      content,
      media,
      type,
      created_at: new Date().toISOString(),
      reactions: { like: [], love: [], sad: [], angry: [] },
      comments: [],
      shares: []
    };
  
    posts.posts.push(newPost);
    await useStorage().setItem("posts.json", posts);
  
    return { success: true, message: "Post created successfully" };
  });