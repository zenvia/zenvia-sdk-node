import { IButtons, IReplyableText } from "../../types";
import { AbstractContent } from "./abstract-content";

/**
 * Implementation of Replyable Text content.
 */
export class ReplyableTextContent extends AbstractContent implements IReplyableText {
    text: string;
    quickReplyButtons?: IButtons[];

    /**
     * 
     * @param text Text to be sent.
     * @param quickReployButtons Horizontal list of buttons displayed after the content.
     */
    constructor(text: string, quickReplyButtons?: IButtons[]) {
        super('replyable_text');
        this.text = text;
        this.quickReplyButtons = quickReplyButtons;
    }

}