import { IQuickReplyButtons, IReplyableText } from "../../types";
import { AbstractContent } from "./abstract-content";

export class ReplyableTextContent extends AbstractContent implements IReplyableText {
    text: string;
    quickReplyButtons?: IQuickReplyButtons[];

    /**
     * 
     * @param text Text to be sent.
     * @param quickReployButtons Horizontal list of buttons displayed after the content.
     */
    constructor(text: string, quickReployButtons?: IQuickReplyButtons[]) {
        super('replyable_text');
        this.text = text;
        this.quickReplyButtons = quickReployButtons;
    }

}