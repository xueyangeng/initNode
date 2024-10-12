import Router from "@koa/router";
import { Creation } from "../../../model/creation";
import { creationSvc } from "../../../service/creation";
const router = new Router();

router.get("/list", async (ctx) => {
    // 创建作品
    const creations = await creationSvc.findAll({}) as Creation[];
    ctx.success(creations);
});

export const list = router.routes();