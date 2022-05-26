import { CardWidthType, ICardContent, ICarouselContent, IQuickReplyButtons } from "../../types";
import { AbstractContent } from "./abstract-content";

/**
 * Implementation of carousel content.
 */
export class CarouselContent extends AbstractContent implements ICarouselContent {
    cardWidth?: CardWidthType;
    cards: ICardContent[];
    quickReplyButtons?: IQuickReplyButtons[];

    /**
     * @param cards The sequente of cards to be shown in the carousel
     * @param cardWidth The card width, enum: SMALL, MEDIUM, default: MEDIUM
     * @param quickReplyButtons Horizontal list of buttons displayed after the content.
     */
    constructor(cards: ICardContent[], cardWidth?: CardWidthType, quickReplyButtons?: IQuickReplyButtons[]) {
        super('carousel');
        this.cardWidth = cardWidth;
        this.cards = cards;
        this.quickReplyButtons = quickReplyButtons;
    }

}