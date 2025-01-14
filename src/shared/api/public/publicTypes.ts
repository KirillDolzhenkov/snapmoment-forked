export interface GetPostsArgs {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export type GetPostByIdArgs = {
  postId: null | number;
} & GetPostsArgs;

export interface GetPostsResponse {
  items: Item[];
  pageSize: number;
  totalCount: number;
  totalUsers: number;
}

export type getPostCommentsByPostIdArgs = {
  postId: null | number;
};
export type GetPostByIdResponse = {
  avatarOwner?: string;
  createdAt: string;
  description: string;
  id: number;
  images: GetPostsCommentArgsImages[];
  isLiked: boolean;
  likesCount: number;
  location: string;
  owner: GetPostsCommentArgsOwner;
  ownerId: number;
  updatedAt: string;
  userName: string;
};
export type GetPostsCommentArgsImages = {
  createdAt?: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
};
export type GetPostsCommentArgsOwner = {
  firstName: string;
  lastName: string;
};
export type GetTotalUsersCountProps = {
  totalCount: number;
};

export interface Item {
  avatarOwner: string;
  createdAt: string;
  description: string;
  id: number;
  images: Image[];
  isLiked: boolean;
  likesCount: number;
  location: string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
}

export interface Owner {
  firstName: string;
  lastName: string;
}

export interface Image {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}

export interface GetPostCommentsByPostIdResponse {
  items?: CommentsViewModel[];
  pageSize: number;
  totalCount: number;
}

export type ParentViewModel = {
  avatars: Avatar[];
  id: number;
  username: string;
};
export type CommentsViewModel = {
  answerCount: number;
  content: string;
  createdAt: string;
  from: ParentViewModel;
  id: number;
  isLiked: boolean;
  likeCount: number;
  postId: number;
};

export type UserFollowingFollowersProps = {
  avatars: Avatar[];
  createdAt: string;
  id: number;
  isFollowedBy: boolean;
  isFollowing: boolean;
  userId: number;
  userName: string;
};

export type ItemsFrom = {
  avatars: Avatar[];
  id: number;
  username: string;
};
export type AnswerItems = {
  commentId: number;
  content: string;
  createdAt: string;
  from: ItemsFrom;
  id: number;
  isLiked: boolean;
  likeCount: number;
};

export interface GetPublicUserProfileResponse {
  aboutMe: string;
  avatars: Avatar[];
  id: number;
  userName: string;
}

export interface GetPublicPostsUserArgs extends GetPostsArgs {
  userId: number;
}
