// 将ng模板编译成preact可以执行的文件
import { NgModuleConfig } from './types'
import { Injector } from 'nger-di';

// 需要将模板转换成preact
export class NgerCompilerPreactHtml {
    constructor(public injector: Injector) { }
    async run(config: NgModuleConfig) {
        const { declarations } = config;
        declarations.map(comp => {
            console.log(comp)
        });
    }
}
