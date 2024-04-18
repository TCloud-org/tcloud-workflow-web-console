export interface Email {
  id: number;
  workflowId: number;
  sender: string;
  recipients: InternetAddress[];
  cc: InternetAddress[];
  bcc: InternetAddress[];
  subject: string;
  body: string;
  attachments: string[];
  sentAt: string;
}

export interface InternetAddress {
  address: string;
  personal: string;
  encodedPersonal: string;
}
