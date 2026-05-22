import { IFlowContent } from '../../types';
import { AbstractContent } from './abstract-content';

export class FlowContent extends AbstractContent implements IFlowContent {
  header?: string;
  body: string;
  footer?: string;
  flow: { mode?: string; token?: string; id: string; buttonText: string; action?: { type: string; screen?: string; data?: { [key: string]: string; }; }; };

  constructor(body: string, flowId: string, buttonText: string, action?: { type: string; screen?: string; data?: { [key: string]: string; }; }, header?: string, footer?: string, mode?: string, token?: string) {
    super('flow');
    this.body = body;
    this.flow = { id: flowId, buttonText };
    if (mode) { this.flow.mode = mode; }
    if (token) { this.flow.token = token; }
    if (action) { this.flow.action = action; }
    this.header = header;
    this.footer = footer;
  }
}
