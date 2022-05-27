import { CardWidthType, ICardContent, ICarouselContent, IButtons } from "../../types";
import { AbstractContent } from "./abstract-content";

/**
 * Implementation of carousel content.
 */
export class CarouselContent extends AbstractContent implements ICarouselContent {
    cardWidth?: CardWidthType;
    cards: ICardContent[];
    quickReplyButtons?: IButtons[];

    /**
     * @param cards The sequente of cards to be shown in the carousel
     * @param cardWidth The card width, enum: SMALL, MEDIUM, default: MEDIUM
     * @param quickReplyButtons Horizontal list of buttons displayed after the content.
     */
    constructor(cards: ICardContent[], cardWidth?: CardWidthType, quickReplyButtons?: IButtons[]) {
        super('carousel');        
        this.cards = cards;
        this.cardWidth = cardWidth;
        this.quickReplyButtons = quickReplyButtons;
    }

}