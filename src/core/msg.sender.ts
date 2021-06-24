<<<<<<< HEAD:_deprecated/msg.sender.ts
import { initFuncResult } from '../src/core/command/command.app';
import { MessageType, ResultTypes } from '../src/core/types';
import { SendFunc } from '../src/core/msg.types';
import { BaseSession } from '../src/core/session/session.base';
import { KBotify } from '../src';
import { mentionById } from '../src/utils/mention-by-id';

/**
 * @deprecated
 */
=======
<<<<<<< HEAD:src/core/msg.sender.ts
import { initFuncResult } from './command/command.app';
import { MessageType, ResultTypes } from './types';
import { SendFunc } from './msg.types';
import { BaseSession } from './session/session.base';
import { KBotify } from '..';
import { mentionById } from '../utils/mention-by-id';

/**
 * @deprecated
 */
=======
import { KBotify } from '../../utils/kbotify';
import { MessageType } from 'kaiheila-bot-root/dist/types';
import { mentionById } from '../../utils/mention-by-id';
import { initFuncResult } from './app.command';
import { ResultTypes } from './types';
import { SendFunc } from './msg.types';
import { BaseSession } from './session';

>>>>>>> origin/main:src/commands/core/msg.sender.ts
>>>>>>> develop:src/core/msg.sender.ts
export class MsgSender {
    replyChannelId: string | undefined;
    withMention = false;
    withReply = false;
    defaultMessageType: number;
    private bot: KBotify | undefined;
    constructor(
        bot?: KBotify,
        withMention = false,
        withReply = false,
        replyChannelId?: string,
<<<<<<< HEAD:_deprecated/msg.sender.ts
        defaultMessageType = MessageType.kMarkdown
=======
<<<<<<< HEAD:src/core/msg.sender.ts
        defaultMessageType = MessageType.kMarkdown
=======
        defaultMessageType = MessageType.kmarkdown
>>>>>>> origin/main:src/commands/core/msg.sender.ts
>>>>>>> develop:src/core/msg.sender.ts
    ) {
        this.bot = bot;
        if (replyChannelId) this.replyChannelId = replyChannelId;
        if (withMention === false) this.withMention = false;
        if (withReply === false) this.withReply = false;
        this.defaultMessageType = defaultMessageType;
    }

    init = (bot: KBotify): void => {
        // console.debug('msg sender bot assigned')
        this.bot = bot;
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    wrongArgs = async <T extends BaseSession>(
        session: T,
        resultType = ResultTypes.WRONG_ARGS
    ) => {
        const content = `输入的参数数量不正确。如需查看帮助，请直接输入\`[命令] [帮助]\`, 如：\`.账户 绑定 帮助\``;
        return this.send(content, session, resultType, {
            reply: true,
            mention: true,
        });
    };
    /**
     * Reply with mention with default message type of msgSender.
     *
     * @param content content of the message. By default it's in kmarkdown.
     * @param session session.
     * @param [resultType] Optional. If you would like to track the result of your command, please specify. Otherwise it will return success by default.
     */
    reply: SendFunc = async (
        content,
        session,
        resultType = ResultTypes.SUCCESS
    ) => {
        return this.send(content, session, resultType, {
            reply: true,
            mention: true,
        });
    };

    replyOnly: SendFunc = async (
        content,
        session,
        resultType = ResultTypes.SUCCESS
    ) => {
        return this.send(content, session, resultType, {
            reply: true,
            mention: false,
        });
    };

    mention: SendFunc = async (
        content,
        session,
        resultType = ResultTypes.SUCCESS
    ) => {
        return this.send(content, session, resultType, {
            reply: false,
            mention: true,
        });
    };

    sendOnly: SendFunc = async (
        content,
        session,
        resultType = ResultTypes.SUCCESS
    ) => {
        return this.send(content, session, resultType, {
            reply: false,
            mention: false,
        });
    };

    send: SendFunc = async (
        content,
        session,
        resultType = ResultTypes.SUCCESS,
        sendOptions?
    ) => {
        if (typeof content !== 'string') content = await content();

        //decide if msg should be sent in specific channel.
        let replyChannelId = session.msg.channelId;
        replyChannelId = this.replyChannelId ?? replyChannelId;
        replyChannelId = sendOptions?.channel ?? replyChannelId;

        // decide if need mention at the start.
        const withMention = sendOptions?.mention ?? this.withMention;
        const msgType = sendOptions?.msgType ?? this.defaultMessageType;

        if (!this.bot)
            throw new Error('message sender used before bot assigned.');

        const msgSent = this.bot.API.message.create(
            msgType,
            replyChannelId,
<<<<<<< HEAD:_deprecated/msg.sender.ts
            (withMention ? `${mentionById(session.user.id)} ` : '') + content,
=======
<<<<<<< HEAD:src/core/msg.sender.ts
            (withMention ? `${mentionById(session.user.id)} ` : '') + content,
=======
            (withMention ? `${mentionById(session.msg.authorId)} ` : '') + content,
>>>>>>> origin/main:src/commands/core/msg.sender.ts
>>>>>>> develop:src/core/msg.sender.ts
            sendOptions?.reply ? session.msg.msgId : undefined
        );
        return initFuncResult(session, resultType, msgSent);
    };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function replyUnit(
//     event: string | number,
//     content: string | (() => string) | string | (() => Promise<string>),
//     resultType: ResultTypes,
//     mention = true,
//     sendOptions?: Omit<SendOptions, 'mention'>
// ): replyKv {
//     return [event, [content, resultType, { mention: mention, ...sendOptions }]];
// }
