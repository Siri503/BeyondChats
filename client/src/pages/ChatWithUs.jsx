import ChatbotIcon from "../components/ChatbotIcon";
import ChatForm from "../components/ChatForm";
import ChatMessage from "../components/ChatMessage";
import { useRef } from "react";
import "./ChatWithUs.css";
import { useEffect, useState } from "react";
import { companyInfo } from "../companyInfo";
const ChatWithUs = () => {
  const [chatHistory, setChatHistory]=useState([
    {
    hideInChat:true,
    role:"model",
    text:companyInfo
    }

  ]);
  const [showChatbot,setShowChatbot]=useState(false);
  const chatBodyRef=useRef();
  const generateBotResponse=async(history)=>{

    const updateHistory=(text)=>{
      setChatHistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text}]);
    }
    history=history.map(({role,text})=>({role,parts:[{text}]}));
    const requestOptions={
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:history})
    }
    try{
      const response=await fetch(import.meta.env.VITE_API_URL,requestOptions);
      const data=await response.json();
      if(!response.ok)throw new Error(data.error.message||"Something went wrong");
       const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
       updateHistory(apiResponseText);
    }catch(error){
      console.log(error);
    }
  };
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior:"smooth"});
  },[chatHistory]);
  return (
  <div>
    <div className="dashboard-container">
  <aside className="sidebar">
    <h2>Dashboard</h2>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Analytics</a></li>
      <li><a href="#">Messages</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
  </aside>

  <main className="dashboard-content">
    <header className="dashboard-header">
      <h2>Welcome, User!</h2>
      <button className="logout-btn">Logout</button>
    </header>

    <section className="dashboard-widgets">
      <div className="widget">
        <h3>Total Users</h3>
        <p>1,245</p>
      </div>
      <div className="widget">
        <h3>Active Chats</h3>
        <p>89</p>
      </div>
      <div className="widget">
        <h3>New Messages</h3>
        <p>23</p>
      </div>
    </section>
     </main>
     </div>
    <div className={`container ${showChatbot ? "show-chatbot" : ''}`}>
      <button onClick={()=> setShowChatbot(prev => !prev)}
      id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
       <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">
               BeyondChats
            </h2>
          </div>
          <button onClick={()=> setShowChatbot(prev => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hey there! 👋<br />How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat,index)=>(
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
       </div>
    </div>
    </div>
  )
}

export default ChatWithUs;