import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from '../controllers/commentController';


const router = Router();

router.post("/:productId",requireAuth(),commentController.crateCommet);

router.delete('/:productId', requireAuth(),commentController.deleteCommet)

export default router;