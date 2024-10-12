import Router from "@koa/router";
import { list } from "./list";
const router = new Router();
const chapter = [list];
router.use('/chapter', ...chapter);
export const chapterRoutes = router.routes();
