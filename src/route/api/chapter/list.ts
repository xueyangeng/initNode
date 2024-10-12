import Router from "@koa/router";
import { Chapter } from "../../../model/chapter";
import { ChapterService } from "../../../service/chapter";
const router = new Router();
const chapterService = new ChapterService();

router.get("/:creation_id/list", async (ctx) => {
    // 创建作品
    const { creation_id } = ctx.params;
    const chapters = await chapterService.findAll({
        creation_id,
    }) as Chapter[];

    ctx.success(chapters);
});

export const list = router.routes();