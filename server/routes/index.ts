import { Router } from 'express'
import UserController from  '../controllers/UserController'
import SessionController from '../authentication/SessionController'
import PostController from '../controllers/Post/PostController'
import PublishController from '../controllers/Post/PublishController'
const routes = Router()

routes.post('/users/create', UserController.store)
routes.get('/users/list', UserController.index)

routes.post('/auth/login', SessionController.create);
routes.get('/auth', SessionController.load);


routes.post('/posts/create', PostController.store);
routes.put('/posts/publish/:postId', PublishController.update)

export default routes