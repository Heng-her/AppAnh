interface Book {
    id: string;
    title: string;
    author: string;
    cover_image: string;
    content: string;
    uploaded_by: string;
    created_at: string;
  }
  
  interface BooksData {
    books: Book[];
  }
  
  export default defineEventHandler(async (event) => {
    const authToken = getCookie(event, "auth_token");
    if (!authToken) return { success: false, message: "Not authenticated" };
  
    const body = await readBody(event);
    const { title, author, cover_image, content } = body;
  
    // Cast the result to the expected type
    const books = (await useStorage().getItem("books.json") as BooksData) || { books: [] };
  
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      cover_image,
      content,
      uploaded_by: authToken,
      created_at: new Date().toISOString()
    };
  
    books.books.push(newBook);
    await useStorage().setItem("books.json", books);
  
    return { success: true, message: "Book uploaded successfully" };
  });