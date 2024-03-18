import React, { useState, useEffect, useRef } from 'react';
import profilepic from "../img/profile.png";
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, getRealtimeConversations, updateMessage } from '../user/userSlice';
import { selectUsers, selectConversations } from '../user/userSlice';
import './Chat.css'; // Assuming this is the CSS file for styling
import Loading from './Loader';
import FlipMove from 'react-flip-move'; // Import FlipMove

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src={profilepic} alt="" />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
        <span style={{ fontWeight: 500 }}>{user.name}</span>
        <div style={{ margin: '0 10px' }}>
          {user.isOnline ? (
            <span style={{ fontWeight: 500, color: 'green' }}>Online</span>
          ) : (
            <span style={{ fontWeight: 500, color: 'red' }}>Offline</span>
          )}
        </div>
      </div>
    </div>
  );
}

const Chat = () => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const [firstEffectCompleted, setFirstEffectCompleted] = useState(false);
  const temp = useSelector(selectUsers);
  const conversations = useSelector(selectConversations);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const lastMessageDiv = useRef(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('user');
    if (storedData) {
      // Parse the JSON data
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      dispatch(getRealtimeUsers(parsedData.uid))
        .then(() => setFirstEffectCompleted(true))
        .catch((error) => console.error("Error in first useEffect:", error));
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstEffectCompleted) {
      setUsers(temp);
    }
  }, [firstEffectCompleted, temp]);

  const initChat = (user) => {
    setChatStarted(true)
    setChatUser(`${user.name}`)
    setUserUid(user.uid);
    dispatch(getRealtimeConversations({ uid_1: userData.uid, uid_2: user.uid }));
  }

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: userData.uid,
      user_uid_2: userUid,
      message
    }
    if (message !== "") {
      dispatch(updateMessage(msgObj))
        .then(() => {
          setMessage('');
          dispatch(getRealtimeConversations({ uid_1: msgObj.user_uid_1, uid_2: msgObj.user_uid_2 }));
        });
    }
    
  }

  const scrollToBottom = () => {
    if (lastMessageDiv.current) {
      lastMessageDiv.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  return (
    <section className="container-fluid">
      {userData && users ?
        (
          <div className="row">
            <div className="col-md-4 listOfUsers">
              {
                users.length > 0 ?
                  users.map(user => (
                    <User
                      onClick={initChat}
                      key={user.uid}
                      user={user}
                    />
                  )) : null
              }
              <div className="greyLine"></div>
            </div>
            <div className="col-md-8 chatArea">
              <div className="chatHeader">{chatStarted ? chatUser : <span style={{ color: '#f0f0f0' }}>hi</span>}</div>
              <div className="messageSections" >
                <FlipMove>
                  {conversations.length > 0 && chatUser ? (
                    [...conversations]
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .map((conversation, index) => (
                        <div
                          key={index}
                          style={{
                            textAlign: conversation.dir === 'L' ? 'left' : 'right',
                            marginBottom: '10px',
                          }}
                        >
                          <p
                            className={
                              conversation.dir === 'L' ? 'messageStyle1' : 'messageStyle2'
                            }
                          >
                            {conversation.message}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p>No messages</p>
                  )}
                </FlipMove>
                <div ref={lastMessageDiv}></div>
              </div>
             
              {chatStarted &&
                <div className="chatControls">
                  <textarea
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write Message"
                  />
                  <button className="btn btn-primary" onClick={submitMessage}>Send</button>
                </div>
              }
            </div>
          </div>
        ) :
        <Loading />}
    </section>
  );
}

export default Chat;
