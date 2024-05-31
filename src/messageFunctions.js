import { Subject } from 'rxjs';
const subject = new Subject();
console.log('Initializing messageService'); // This should log only once

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};
