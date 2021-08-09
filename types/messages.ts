export enum ExtensionMessageType {
  REQUEST,
  RESPONSE,
  WRITE,
}

export interface ExtensionMessage {
  type: ExtensionMessageType;
  payload?: any;
}
