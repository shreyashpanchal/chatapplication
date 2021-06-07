import React,{useState,useEffect} from 'react'
import './App.css'
import SendIcon from '@material-ui/icons/Send';
import  firebase from './firebase';

function App() {
  const [str,setstr]=useState("");
  const [msg,setMsg]=useState([]);
  const handler=(e)=>{
    setstr(e.target.value);
  }
  useEffect(()=>{
    const db=firebase.firestore();
    db.collection("messages").orderBy("timestamp","desc").onSnapshot((query)=>{
      let array=[];
      query.forEach((doc)=>{
        array.push(doc.data());
      })
      setMsg(array);
   })
   setstr("");
 }
  ,[]);
  const handler1=()=>{
    if(str==="")
    {
     
    }
    else{
     
  const db=firebase.firestore();
  db.collection("messages").add({
    message:str,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    id:"2"
  })

  db.collection("messages").orderBy("timestamp","desc").onSnapshot((query)=>{
     let array=[];
     query.forEach((doc)=>{
       array.push(doc.data());
     })
     setMsg(array);
  })
  setstr("");
}
  }

  
  return (
    <div className="main">
      <h1>Chat App</h1>
      <div className="container">
      
      {
        msg.map((data,index)=>{
          if(data.id==="2")
          {
            return(
              <div className="msg" key={index}>{data.message}</div>
            )
          }
          else{
            return(
              <div className="msg1" key={index}>{data.message}</div>
            )
          }
         
        })
      }
      </div>
      <div className="input">
        <input placeholder="Enter Message" required type="text" value={str} onChange={handler}/>
        <SendIcon className="send" onClick={handler1}>Send</SendIcon>
      </div>
    </div>
  )
}

export default App
