import { CardWidthType, ICarouselContent, Buttons, ICard } from "../../types";
import { AbstractContent } from "./abstract-content";

/**
 * Implementation of carousel content.
 */
export class CarouselContent extends AbstractContent implements ICarouselContent {
    cardWidth?: CardWidthType;
    cards: ICard[];
    quickReplyButtons?: Buttons;

    /**
     * Returns a new `CarouselContent` that can be used to send a carousel of images, GIF, or videos to your customer.
     * 
     * @param cards The sequente of cards to be shown in the carousel
     * @param cardWidth The card width, enum: SMALL, MEDIUM, default: MEDIUM
     * @param quickReplyButtons Horizontal list of buttons displayed after the content.
     */
    constructor(cards: ICard[], cardWidth?: CardWidthType, quickReplyButtons?: Buttons) {
        super('carousel');        
        this.cards = cards;
        this.cardWidth = cardWidth;
        this.quickReplyButtons = quickReplyButtons;
    }

}