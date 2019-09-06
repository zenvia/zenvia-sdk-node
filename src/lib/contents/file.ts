import { AbstractContent } from './abstract-content';
import { IFileContent } from '../../types';

export class FileContent extends AbstractContent implements IFileContent {

  fileUrl: string;
  fileMimeType: string;
  fileCaption: string;

  /**
   * Returns a new `FileContent` that can be used to send image, video, or document to your customer.
   *
   * @param url The protocol and URL of the media to be sent. Use only with HTTP/HTTPS URLs.
   * @param mimeType A media type to indicates the nature and format of a media.
   * @param caption Describes the specified image, video, or document media.
   */
  constructor(url: string, mimeType: string, caption?: string) {
    super('file');
    this.fileUrl = url;
    this.fileMimeType = mimeType;
    this.fileCaption = caption;
  }

}
