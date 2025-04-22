// Imports
import express from 'express';
import { createForumTopic } from '../controllers/forum.controller.js';

// Initialize router
const router = express.Router();

// Define routes
router.post('/create-topic', createForumTopic);

// Export route setup function
const forumRoutes = (app) => {
  app.use('/app_proxy/', router);
};

export default forumRoutes;
