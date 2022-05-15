/* eslint-disable no-continue */
import {extname} from 'path';
import md, {Options} from 'markdown-it';
import {changeExtname, handleHandlebars, TFileHandler, TWorker} from '..';

export interface IMarkdownOptions {
    newExtname?: string | false;
    targetExtnames?: string[];
    markdownOptions?: Options;
    templatingHandler?: TFileHandler;
    templatingHandlerOptions?: unknown;
}

export const handleMarkdown: TFileHandler = (
    content,
    options?,
    data?
): string => md((options as Options) || {}).render(content || '', data);

export function markdown(options?: IMarkdownOptions): TWorker {
    return function markdownWorker(this: TWorker, files, lollygag): void {
        if(!files) return;

        const templatingHandler
            = options?.templatingHandler
            || lollygag._config.templatingHandler
            || handleHandlebars;

        for(let i = 0; i < files.length; i++) {
            const file = files[i];

            const targetExtnames = options?.targetExtnames || ['.md', '.html'];

            if(!targetExtnames.includes(extname(file.path))) {
                continue;
            }

            if(options?.newExtname !== false) {
                file.path = changeExtname(
                    file.path,
                    options?.newExtname || '.html'
                );
            }

            const data = {...lollygag._meta, ...lollygag._config, ...file};

            file.content = templatingHandler(
                file.content || '',
                options?.templatingHandlerOptions,
                data
            );

            const mdOptions = {
                html: true,
                ...options?.markdownOptions,
            };

            file.content = handleMarkdown(file.content || '', mdOptions, data);
        }
    };
}

export default markdown;
