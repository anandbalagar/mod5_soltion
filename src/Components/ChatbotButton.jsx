import React from 'react';
import { Link } from 'react-router-dom';
import img from '../Images/chat-bot.gif';

 
const ChatbotButton = () => {
  return (
    //<Link to="..\client\index.html"  style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
     
     <Link to='chatbot' style={{ position: 'fixed', bottom: '20px', right: '20px' }} >
     <button style={{ border: 'none', background: 'none' }}>
        <img src={img} alt="Chatbot Icon" style={{ width: '80px', height: '80px', borderRadius: '50%' }}  />
      </button>
      </Link>

    //</Link>
  );
};
 
export default ChatbotButton;