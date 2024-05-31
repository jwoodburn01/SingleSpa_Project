import './styles.css';
import { messageService } from '../../src/messageFunctions'; // Ensure correct import path
import { useEffect, useState } from 'react';

export default function Root(props) {
  const date = new Date();
  const formattedDateTime = date.toString(); // current date and time
  const msg = "Hello from app 2 " + formattedDateTime;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('App 2 subscribing to messages');
    const subscription = messageService.getMessage().subscribe(message => {
      console.log('App 2 received message:', message);
      if (message) {
        setMessages(currentMessages => [...currentMessages, message]);
      } else {
        setMessages([]);
      }
    });

    return () => {
      console.log('App 2 unsubscribing from messages');
      subscription.unsubscribe();
    };
  }, []);

  const handleSendMessage = () => {
    messageService.sendMessage(msg);
  }

  return (
    <section>
      <div>
        <h2>App 2</h2>
        <button className='sendMsgButton' onClick={handleSendMessage}>
          Send Message to App 1
        </button>
        <h3>
          Messages from App 1:
          {messages?.map((message, index) => 
            <div key={index}>{message.text}</div>
          )}
        </h3>
      </div>
    </section>
  );
}