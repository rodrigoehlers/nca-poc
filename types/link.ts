export enum LinkMessageType {
  GET_ASSIGNMENT = 'get::assignment',
  RESPONSE_GET_ASSIGNMENT = 'res::get::response',
  POST_RESPONSE = 'post::response',
  RESPONSE_POST_RESPONSE = 'res::post::response',
}

export interface LinkMessage {
  type: LinkMessageType;
  payload?: any;
}

export interface Link {
  postMessage: (message: LinkMessage) => Thenable<boolean>;
}
