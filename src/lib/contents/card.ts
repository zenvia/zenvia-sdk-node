import { type } from "os";
import { Buttons, IButtons, ICardContent, IMedia } from "../../types";
import { AbstractContent } from "./abstract-content";

/**
 * Implementation of card content.
 */
export class CardContent extends AbstractContent implements ICardContent {
    title?: string;
    text?: string;
    media?: IMedia;
    buttons?: Buttons;
    quickReplyButtons?: IButtons[];
    
    /**
     * @param title A title in bold shown above the text of the card
     * @param text A text to be displayed inside the card
     * @param media  object with the media url, disposition and caption
     * @param buttons list of buttons displayed inside a card
     * @param quickReplyButtons Horizontal list of buttons displayed after the content.
     */
    constructor(title?: string, text?: string, media?: IMedia, buttons?: Buttons, quickReplyButtons?: IButtons[]) {
        super('card');
        this.title = title;
        this.text = text;
        this.media = media;
        this.buttons = buttons;
        this.quickReplyButtons = quickReplyButtons;
    }
}