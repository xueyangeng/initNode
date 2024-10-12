import Router from "@koa/router";
import fs from "fs";
import { analyzeChapterContent, decodeTxtFile } from "../../../lib/split_chapters";
import { Chapter } from "../../../model/chapter";
import { Creation } from "../../../model/creation";
import { chapterSvc } from "../../../service/chapter";
import { CreationStatus, creationSvc } from "../../../service/creation";
const router = new Router();

const analyzeTxtCreationFile = async (ctx, file: any, creation: Creation) => {
    const uint8Array = fs.readFileSync(file.filepath);
    const { chapters, description } = await decodeTxtFile(uint8Array);
    for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        const content = analyzeChapterContent(chapter.content);
        // 目前写库效率低
        // TODO: 优化写库效率, 改成多条Insert
        await chapterSvc.create({
            title: chapter.title,
            content,
            creation_id: creation.id,
            order: i,
        } as Chapter);
    }
    creation.description = description.slice(0, 255);
    creation.status = CreationStatus.SUCCESS;
    await creation.save();
    return { chapters };
}
router.post("/upload", async (ctx) => {
    const { files } = ctx.request as any;

    // 上传的文件
    const file = files.file;
    const title = file.originalFilename.replace(/\.\w+$/, '');

    // 创建作品
    const creation = await creationSvc.create({
        title,
        description: '',
        status: CreationStatus.PROCESSING,
        created_user_id: "1797767752820092928",
    } as Creation);

    // 解析txt文件, 异步处理
    analyzeTxtCreationFile(ctx, file, creation);

    // 章节标题
    ctx.success(creation);
});

export const upload = router.routes();