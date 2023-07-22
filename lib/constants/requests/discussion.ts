export type CreateDiscussionRequest = {
  sessionId: string;
  content: string;
};

export type GetDiscussionQuery = {
  sessionId?: string | undefined;
  userId?: string | undefined;
};
