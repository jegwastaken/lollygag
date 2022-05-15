export * from './workers/handlebars';
export * from './workers/markdown';
export * from './workers/templates';
export declare function fullExtname(filePath: string): string;
export declare function changeExtname(filePath: string, newExtension: string): string;
export declare function changeFullExtname(filePath: string, newExtension: string): string;
export declare function addParentToPath(parent: string, path: string): string;
export declare function removeParentFromPath(parent: string, path: string): string;
