import { Injectable } from '@nestjs/common';
import { FilesPath } from '../_config'
import { getfolio, unlink, readFile, rewriteFile, getFiles, mkdir } from '../_utils/file';
import { getTime, getUuiD } from '../_utils';

@Injectable()
export class NoteService { 
    async getNoteListAll(state): Promise<any> {
        let jsonPathList: any = []
        getfolio(`${FilesPath.__noteLogs}`).forEach(dir => {
            jsonPathList = [
                ...jsonPathList, ...getFiles(FilesPath.__noteLogs + `/${dir}`).map(i => FilesPath.__noteLogs + `/${dir}/` + i)
            ]
        })
        const result = await Promise.all(
            jsonPathList.map(i => readFile(i))
        ) || []
        return result.map(jn => {
            try {
                return JSON.parse(jn)
            }catch {
                return {}
            }
        }).sort((a, b) => (new Date(b.latestTime).valueOf() - new Date(a.latestTime).valueOf()))
    }

    async getNoteList(state): Promise<any> {
        const fls: any = await getFiles(FilesPath.__noteLogs + `/${state.uid}`)
        const result = await Promise.all(
            fls.map(i => readFile(FilesPath.__noteLogs + `/${state.uid}/` + i))
        ) || []
        return result.map(jn => {
            try {
                return JSON.parse(jn)
            }catch {
                return {}
            }
        }).sort((a, b) => (new Date(b.latestTime).valueOf() - new Date(a.latestTime).valueOf()))
    }

    async addNote(state): Promise<any>  {
        await mkdir(FilesPath.__noteLogs + `/${state.uid}`)
        state.noteid = getUuiD()
        state.createTime = getTime()
        state.latestTime = getTime()
        rewriteFile(FilesPath.__noteLogs + `/${state.uid}` + `/${state.noteid}.json`, JSON.stringify(state, null, 2))
    }

    async editNote(state):  Promise<any>  {
        const hsbygoneState: any = await readFile(FilesPath.__noteLogs + `/${state.uid}` + `/${state.noteid}.json`)
        state.createTime = JSON.parse(hsbygoneState || '{}').createTime || getTime()
        state.latestTime = getTime()
        rewriteFile(FilesPath.__noteLogs + `/${state.uid}` + `/${state.noteid}.json`, JSON.stringify(state, null, 2))
    }

    async removeNote(state): Promise<any> {
        unlink(FilesPath.__noteLogs + `/${state.uid}` + `/${state.noteid}.json`)
    }
}
