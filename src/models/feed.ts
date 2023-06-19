import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { PostProps } from "@/types/PostProps";
import axios from 'axios';
import { CommentProps } from "@/types/CommentProps";
import { ReactionProps } from "@/types/ReactionProps";
import { ReactionTypes } from "@/lib/reactionTypes";
import { RootState } from "@/store";
import { Comment, Post, Reaction, User } from "@prisma/client";

export const feed = createModel<RootModel>()({
  state: {
    users: { byId: {} as Record<string, {id:string,name:string,image:string}>, allIds: [] as string[] },
    posts: { byId: {} as Record<string, Post>, allIds: [] as string[] },
    skip: 0,
    hasMore: true,
    reactions: { byId: {}, allIds: [] as string[] },
    comments: { byId: {}, allIds: [] as string[] }
  },
  reducers: {
    // handle state changes with pure functions
    addUsers(state, users: User[]) {
      return {
        ...state,
        users: {
          byId: {
            ...state.users,
            ...users.reduce((users, {id,name,image}) => 
            Object.assign(users,
              {[id]: {id,name,image}}
            ))
          },
          allIds: users.map(user => user.id)
        }
      }
    },
    addPosts(state, posts: Post[]) {
      return { 
        ...state,
        posts: {
          byId: {
            ...state.posts,
            ...posts.reduce(
              (posts, {id,content,published,image,authorId,updatedAt}) => 
              Object.assign(posts, 
                {[id]:{id,content,published,image,authorId,updatedAt}}
              )
            )
          },
          allIds: posts.map(post => post.id)
        }
      };
    },
    addReactions(state, reactions: Reaction[]) {
      return {
        ...state,
        reactions: {
          byId: {
            ...state.reactions,
            ...reactions.reduce((reactions, {id,postId,authorEmail,type}) => 
            Object.assign(reactions,
              {[id]: {id,postId,authorEmail,type}}
            ))
          },
          allIds: reactions.map(user => user.id)
        }
      }
    },
    addComments(state, comments: Comment[]) {
      return {
        ...state,
        comments: {
          byId: {
            ...state.comments,
            ...comments.reduce((comments, {id,postId,authorId,content,image,parentId,updatedAt}) => 
            Object.assign(comments,
              {[id]: {id,postId,authorId,content,image,parentId,updatedAt}}
            ))
          },
          allIds: comments.map(user => user.id)
        }
      }
    },
    incrementSkip(state, payload: number = 4) {
      const skip = payload;
      return {
        ...state,
        skip: skip,
      };
    },
    setHasMore(state, hasMore: boolean) {
      return {
        ...state,
        hasMore
      }
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    async fetchMorePosts(numberOfPosts: number, state) {
      const skip = state.feed.skip;
      const posts: Post[] = await axios.get(`/api/post`, {
        params: {
          take: numberOfPosts,
          skip
        }
      }).then(res => res.data)
      const authorIds = posts.map(post => post.authorId);
      const userIds = state.feed.users.allIds;
      const usersPromise = axios.get(`/api/user`, {
        params: {
          ids: userIds.filter(id => !authorIds.includes(id))
        }
      });
      const commentsPromise = axios.get(`/api/comment`, {
        params: {
          postids: state.feed.posts.allIds
        }
      })
      const reactionsPromise = axios.get(`/api/reaction`, {
        params: {
          postids: state.feed.posts.allIds
        }
      })
      const [ users, comments, reactions ] = 
        await Promise.all([usersPromise, commentsPromise, reactionsPromise])
        .then(responses => responses.map(res => res.data) as [ User[], Comment[], Reaction[] ]);
      dispatch.feed.addPosts(posts);
      dispatch.feed.addUsers(users);
      dispatch.feed.addComments(comments);
      dispatch.feed.addReactions(reactions);
      dispatch.feed.incrementSkip(posts.length);
      if (posts.length == 0) dispatch.feed.setHasMore(false);
    },
    // async createComment(payload: { postId: string, content: string, image: string }, state) {
    //   dispatch.feed.selectPost(payload.postId);
    //   const { postId, content, image } = payload;
    //   const comment: CommentProps = await axios.post(`/api/post/${postId}/comment`, {
    //     content,
    //     image,
    //   }).then(res => res.data);
    //   dispatch.feed.addComments({ comments: [comment], postId: postId });
    // },
    // async upsertReaction(payload: { postId: string, type: number, authorEmail: string }, state) {
    //   dispatch.feed.selectPost(payload.postId);
    //   const { postId, type, authorEmail } = payload;
    //   const reaction = await axios.post(`/api/post/${postId}/reaction`, {
    //     type
    //   }).then(res => res.data);
    //   dispatch.feed.updateReaction({reaction, postId, authorEmail});
    // }
  }),
});