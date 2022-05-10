/* eslint-disable no-continue */
import {extname} from 'path';
import {changeExtname, IConfig, IFile, RaggedyObject, TWorker} from '@lollygag/core';

export interface IOptions {
    newExtname?: string | false;
    targetExtnames?: string[];
    options?: RaggedyObject;
}

export type TTemplateData = IConfig & IFile;

export function _{{workerName}}(
    content: string,
    options: IOptions,
    data: TTemplateData
): string {
    console.log(content);
    console.log(options);
    console.log(data);

    return '';
}

export function {{workerName}}(options?: IOptions): TWorker {
    return function {{workerName}}Worker(this: TWorker, files, lollygag): void {
        if(!files) return;

        for(let i = 0; i < files.length; i++) {
            const file = files[i];

            const targetExtnames = [
                ...['.html'],
                ...(options?.targetExtnames || []),
            ];

            if(!targetExtnames.includes(extname(file.path))) {
                continue;
            }

            if(options?.newExtname !== false) {
                file.path = changeExtname(
                    file.path,
                    options?.newExtname || '.html'
                );
            }

            const data = {...lollygag._config, ...file};

            file.content = _{{workerName}}(file.content || '', options, data);
        }
    };
}

export default {{workerName}};