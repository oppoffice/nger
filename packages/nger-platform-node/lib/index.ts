import { createPlatformFactory, Logger, FileSystem, Resolver, APP_ROOT, NGER_CONFIG } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import fs from 'fs-extra';
import { dirname, join } from 'path'
import {
    NodeJsInputFileSystem,
    CachedInputFileSystem,
    ResolverFactory
} from 'enhanced-resolve';
export default createPlatformFactory(ngerPlatformAxios, 'node', [
    {
        provide: APP_ROOT,
        useValue: process.cwd()
    },
    {
        provide: NGER_CONFIG,
        useFactory: (root: string) => {
            const config = require(join(root, 'config/config.json'))
            return config;
        },
        deps: [APP_ROOT],
        multi: true
    },
    {
        provide: NgerUtil,
        useClass: NgerUtil,
        deps: [
            Logger
        ]
    }, {
        provide: FileSystem,
        useFactory: () => {
            const writeFileSync = fs.writeFileSync;
            const ensureDirSync = fs.ensureDirSync;
            // 先确认文件夹
            fs.writeFileSync = (path: fs.PathLike | number, data: any, options?: fs.WriteFileOptions) => {
                ensureDirSync(dirname(path.toString()))
                writeFileSync(path, data, options)
            }
            return fs;
        },
        deps: []
    }, {
        provide: Resolver,
        useFactory: () => {
            const root = process.cwd();
            return ResolverFactory.createResolver({
                fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000) as any,
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [join(root, 'packages'), join(root, 'node_modules')]
            })
        },
        deps: []
    }
]);