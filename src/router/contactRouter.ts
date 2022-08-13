import { Router } from 'express';
import * as contactController from '../controllers/contactController';

const router = Router();
router.post('/', contactController.createContact);
router.get('/', contactController.getAllContactsByUserId);
router.put('/:contactId', contactController.updateContact);
router.delete('/:contactId', contactController.deleteContact);
export default router;
