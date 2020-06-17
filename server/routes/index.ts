import { Router } from 'express'
import UserController from  '../controllers/UserController'
import SessionController from '../authentication/SessionController'
import PostController from '../controllers/Post/PostController'
import FeedController from '../controllers/Post/FeedController'
import PublishController from '../controllers/Post/PublishController'
import DraftsController from '../controllers/Post/Drafts/DraftsController'
const routes = Router()

routes.post('/users/create', UserController.store)
routes.get('/users/list', UserController.index)

routes.post('/auth/login', SessionController.create);
routes.get('/auth', SessionController.load);

routes.get('/get/feed', FeedController.index);

routes.get('/posts/:postId', PostController.index)
routes.post('/posts/create', PostController.store);
routes.delete('/posts/delete/:postId', PostController.delete)
routes.put('/put/posts/publish/:postId', PublishController.update)


routes.get('/get/drafts', DraftsController.index)

export default routes