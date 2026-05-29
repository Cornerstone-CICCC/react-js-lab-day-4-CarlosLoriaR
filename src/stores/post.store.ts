import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Post {
  id: string;
  title: string;
  content: string;
  isDeleted: boolean;
}

interface PostStore {
  posts: Post[];
  addPost: (title: string, content: string) => void;
  updatePost: (id: string, title: string, content: string) => void;
  deletePost: (id: string) => void;
  recoverPost: (id: string) => void;
  permanentlyDeletePost: (id: string) => void;
  getPostById: (id: string) => Post | undefined;
  getActivePosts: () => Post[];
  getDeletedPosts: () => Post[];
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (title: string, content: string) => {
        const newPost: Post = {
          id: uuidv4(),
          title,
          content,
          isDeleted: false,
        };
        set((state) => ({
          posts: [...state.posts, newPost],
        }));
      },

      updatePost: (id: string, title: string, content: string) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, title, content } : post,
          ),
        }));
      },

      deletePost: (id: string) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, isDeleted: true } : post,
          ),
        }));
      },

      recoverPost: (id: string) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, isDeleted: false } : post,
          ),
        }));
      },

      permanentlyDeletePost: (id: string) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },

      getPostById: (id: string) => {
        return get().posts.find((post) => post.id === id);
      },

      getActivePosts: () => {
        return get().posts.filter((post) => !post.isDeleted);
      },

      getDeletedPosts: () => {
        return get().posts.filter((post) => post.isDeleted);
      },
    }),
    {
      name: "post-store",
    },
  ),
);
