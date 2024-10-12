import { OriginalContentSetting } from "../model/chapter";
import guuid from "./guuid";

// 分割章节
const splitChapters = (text) => {
    const delimiter = /^(\ )*第.+(章|回).+/;
    const chapters = [];
    const content = text.replace(/\r\n/g, '\n');
    const lines = content.split('\n');
    let currentChapter = { title: '', content: '' };
    let description: string[] = [];
    lines.forEach(line => {
        if (line.match(delimiter)) {
            if (currentChapter.title) {
                chapters.push(currentChapter);
            } 
            currentChapter = { title: line, content: '' };
        } else {
            currentChapter.content += line + '\n';
        }
    });
    const chaptersFiltered = chapters?.filter(item => item.content?.length > 0);
    return { chapters: chaptersFiltered, description: description.filter(item => item.length > 0)?.join('\n') };
}

// 文件解码
const decodeTxtFile = async (file: Uint8Array) => {
    let chapters: { title: string, content: string }[] = [];
    let description: string = '';
    const encodings = [
        'utf-8',
        'gbk',
        'utf-16le',
        'utf-16be',
        'windows-1252',
        'iso-8859-1',
    ];
    const contents = encodings.map(encoding => {
        const decoder = new TextDecoder(encoding);
        return decoder.decode(file);
    });
    for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        const result = splitChapters(content);
        chapters = result?.chapters;
        description = result.description;
        if (chapters.length > 0) {
            break;
        }
    }
    return { chapters, description };
};
const analyzeChapterContent = (content: string) => {
    const lines = content.split('\n');
    let cont: OriginalContentSetting[] = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const item = { id: guuid(), text: lines[i], order: i, clips: [] }
        const clips = line.trim().split(/[。？！，\ “”…—‘’【】：、*~]/);
        item.clips = clips.map((clip, index) => {
            return { text: clip, id: guuid() }
        }).filter(clip => clip.text.length > 0);
        cont.push(item);
    }
    cont = cont.filter(item => item.clips.length > 0);
    return cont;
}
export { analyzeChapterContent, decodeTxtFile, splitChapters };

