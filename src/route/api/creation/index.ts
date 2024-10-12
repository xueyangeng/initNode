import Router from "@koa/router";
import { list } from "./list";
import { upload } from "./upload";
const router = new Router();
const creation = [upload, list];
router.use('/creation', ...creation);
export const creationRouter = router.routes();
