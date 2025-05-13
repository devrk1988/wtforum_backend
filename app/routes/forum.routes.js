// Imports
import express from 'express';
import { createForumTopic, forumCustomerCreateWebhook, getUserPosts, createForumTopicPost , likeDislikePosts } from '../controllers/forum.controller.js';

// Initialize router
const router = express.Router();

// Define routes
router.post('/create-topic', createForumTopic);
router.post('/create-topic-post', createForumTopicPost);
router.post('/update-customer-meta', forumCustomerCreateWebhook);
router.post('/get-user-posts', getUserPosts);
router.post('/like-dislike-post', likeDislikePosts);


// Export route setup function
const forumRoutes = (app) => {
  app.use('/app_proxy/', router);
};

export default forumRoutes;
