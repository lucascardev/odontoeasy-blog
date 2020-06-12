import { Router } from 'express'
import UserController from  '../controllers/UserController'
import SessionController from '../authentication/SessionController'
import PostController from '../controllers/Post/PostController'
const routes = Router()

routes.post('/users/create', UserController.store)
routes.get('/users/list', UserController.index)

routes.post('/auth/login', SessionController.create);
routes.get('/auth', SessionController.load);

routes.post('/posts/create', PostController.store);

export default routes