import './styles.css';
import { messageService } from '../../src/messageFunctions';
import { useEffect, useState } from 'react';

export default function Root(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('App 1 subscribing to messages');
    const subscription = messageService.getMessage().subscribe(message => {
      console.log('App 1 received message:', message);
      if (message) {
        setMessages(currentMessages => [...currentMessages, message]);
      } else {
        setMessages([]);
      }
    });

    return () => {
      console.log('App 1 unsubscribing from messages');
      subscription.unsubscribe();
    };
  }, []);

  const handleSendMessage = () => {
    const msg = "Hello from app 1 " + new Date().toString();
    messageService.sendMessage(msg);
  }

  return (
    <section>
      <div>
        <h2>App 1</h2>
        <button className='sendMsgButton' onClick={handleSendMessage}>
          Send Message to App 2
        </button>
        <h3>
          Messages from App 2:
          {messages.map((message, index) => (
            <div key={index}>{message.text}</div>
          ))}
        </h3>
      </div>
    </section>
  );
}