import { Controller, Inject, Optional, Post, PostProperty, Get, Logger } from 'nger-core';
import { HomeController } from './home'
import { NgerPm2Service } from 'nger-module-pm2';
import { Observable } from 'rxjs'
@Controller('/sms')
export class SmsController {
    @Inject() public logger: Logger
    count$: Observable<number>;
    constructor(
        @Inject() public home: HomeController,
        @Inject() @Optional() public pm2: NgerPm2Service,
        // private store: Store<{ count: number }>
    ) {
        // this.count$ = store.pipe(select('count'));
        // this.count$.subscribe(res => { });
    }

    @Get()
    add() {
        // this.store.dispatch(new Increment())
        return `success`
    }

    @Post('阿里云网址')
    sendAliSms: PostProperty<any>;
    // @EntityRepository(NgerSmsEntity)
    // smsRepository: EntityRepository<NgerSmsEntity>;
    @Post()
    async sendSms(type: 'aliyun', uid: number, PhoneNumbers: string) {
        const code = `1234`;
        // const setting = await this.smsRepository.findOne({
        //     uid: uid
        // })
        let setting: any;
        if (type === 'aliyun') {
            return this.sendAliSms({
                PhoneNumbers: PhoneNumbers,
                SignName: setting.SignName,
                TemplateCode: setting.TemplateCode,
                AccessKeyId: setting.AccessKeyId,
                Action: 'SendSms',
                OutId: setting.OutId,
                TemplateParam: {
                    code: code
                }
            })
        }
    }
}