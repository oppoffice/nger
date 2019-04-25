import { Command, Inject } from 'nger-core'
import { ConsoleLogger, LogLevel, Logger } from 'nger-logger';

@Command({
    name: 'test',
    description: '单元测试',
    example: {
        command: 'nger test',
        description: '单元测试'
    }
})
export class TestCommand {
    @Inject() logger: Logger;

    run() {
        this.logger.warn(`testing`);
    }
}