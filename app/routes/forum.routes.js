// Imports
import express from 'express';
import { createForumTopic, forumCustomerCreateWebhook } from '../controllers/forum.controller.js';

// Initialize router
const router = express.Router();

// Define routes
router.post('/create-topic', createForumTopic);
router.post('/update-customer-meta', forumCustomerCreateWebhook);

// Export route setup function
const forumRoutes = (app) => {
  app.use('/app_proxy/', router);
};

export default forumRoutes;
