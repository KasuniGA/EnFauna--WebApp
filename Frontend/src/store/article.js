import { create } from "zustand";

export const useArticleStore = create((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
  createArticle: async (newArticle) => {
    if (!newArticle.title || !newArticle.description || !newArticle.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    });
    const data = await res.json();
    set((state) => ({ articles: [...state.articles, data.data] }));
    return { success: true, message: "Article created successfully" };
  },
  fetchArticles: async () => {
    const res = await fetch("/api/article");
    const data = await res.json();
    set({ articles: data.data });
  },
  deleteArticle: async (pid) => {
    const res = await fetch(`/api/article/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      articles: state.articles.filter((article) => article._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateArticle: async (pid, updatedArticle) => {
    try {
      const res = await fetch(`/api/article/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        articles: state.articles.map((article) =>
          article._id === pid ? { ...article, ...updatedArticle } : article
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error updating article" };
    }
  },
}));
