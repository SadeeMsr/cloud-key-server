import { Router } from 'express';
import {
  createUserKeys,
  getUserKeysByUID,
  getUserKeysByUname,
} from '../Controllers/userController.js';

const router = Router();

router.post('/create-user-keys', createUserKeys);
router.get('/get-keys-by-uid/:uid', getUserKeysByUID);
router.get('/get-keys-by-uname/:u_name', getUserKeysByUname);

export default router;
