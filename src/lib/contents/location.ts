import { AbstractContent } from './abstract-content';
import { ILocationContent } from '../../types';

/**
 * Implementation of location content.
 */
export class LocationContent extends AbstractContent implements ILocationContent {

  longitude: number;
  latitude: number;
  name: string;
  address: string;
  url: string;

  /**
   * Returns a new `LocationContent` that can be used to send location to your customer.
   *
   * @param longitude Longitude of the location.
   * @param latitude Latitude of the location.
   * @param name Name of the location.
   * @param address Address of the location. Only displayed if name is present.
   * @param url URL for the website where the location information was downloaded. (WhatsApp restriction: available only on IN direction)
   */
  constructor(longitude: number, latitude: number, name?: string, address?: string, url?: string) {
    super('location');
    this.longitude = longitude;
    this.latitude = latitude;
    this.name = name;
    this.address = address;
    this.url = url;
  }

}
