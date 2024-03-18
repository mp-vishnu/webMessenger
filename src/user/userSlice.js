import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection,addDoc, getDocs, setDoc,query,where,orderBy, serverTimestamp } from 'firebase/firestore';
// import { firestore } from '../firebase/config';
import app from '../firebase/config';
const initialState = {
  users: [],
  conversations: [],
};

export const getRealtimeUsers = createAsyncThunk(
  'user/getRealtimeUsers',
  async (currentUser, { rejectWithValue }) => {
    try {
      const db = getFirestore(app);
      const usersCollection = collection(db, 'users');
      console.log("currentuser",currentUser);

      // Exclude the user with UID 'kid'
      const querySnapshot = await getDocs(usersCollection);
      const users = querySnapshot.docs
        .filter(doc => doc.data().uid !== currentUser)
        .map(doc => {
          const data = doc.data();
          // Convert the Timestamp object to a serializable format (e.g., milliseconds)
          return {
            ...data,
            createdAt: data.createdAt.toMillis()
          };
        });

      console.log("returning users", users);
      return users;
    } catch (error) {
      console.error('Failed to get realtime users:', error);
      return rejectWithValue(error.message);
    }
  }
);
// export const getRealtimeUsers = createAsyncThunk(
//   'user/getRealtimeUsers',
//   async (uid, { rejectWithValue }) => {
//     try {
//       const db = getFirestore(app);
//       const unsubscribe = db.collection("users")
//         .onSnapshot((querySnapshot) => {
//           const users = [];
//           querySnapshot.forEach(function(doc) {
//             if (doc.data().uid !==uid) { // Exclude the 'kid' user
//               users.push(doc.data());
//             }
//           });
//           console.log("returning users", users);
//           return users;
//         });
//       console.log("returning unsubscribe", unsubscribe);
//       return unsubscribe;
//     } catch (error) {
//       console.error('Failed to get realtime users:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const updateMessage = createAsyncThunk(
  'user/updateMessage',
  async (msgObj, { rejectWithValue }) => {
    try {
      console.log("msgObj update", msgObj);
      const db = getFirestore(app);
      await addDoc(collection(db, 'conversations'), {
        ...msgObj,
        isView: false,
        createdAt: serverTimestamp(),
      });
      return null; // Success
    } catch (error) {
      console.error('Failed to update message:', error);
      return rejectWithValue(error.message);
    }
  }
);

// export const updateMessage = createAsyncThunk(
//   'user/updateMessage',
//   async (msgObj, { rejectWithValue }) => {
//     try {
//       const db = getFirestore(app);
//       const usersCollection = collection(db, 'conversations');
//       await db.collection('conversations').add({
//         ...msgObj,
//         isView: false,
//         createdAt: new Date()
//       });
//       return null; // Success
//     } catch (error) {
//       console.error('Failed to update message:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const getRealtimeConversations = createAsyncThunk(
  'user/getRealtimeConversations',
  async (user, { rejectWithValue }) => {
    try {
      const db = getFirestore(app);
      const chats = [];
      const conversationsCollection = collection(db, 'conversations');
      const querySnapshot = await getDocs(
        query(conversationsCollection, orderBy('createdAt', 'asc'))
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        if (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2===user.uid_2) {
          chats.push({ message: doc.data().message, dir: 'R' });
        }
        if (doc.data().user_uid_1 === user.uid_2  && doc.data().user_uid_2===user.uid_1) {
          chats.push({ message: doc.data().message, dir: 'L' });
        }
      });

      return chats;
    } catch (error) {
      console.error('Failed to get realtime conversations:', error);
      return rejectWithValue(error.message);
    }
  }
);


// export const getRealtimeConversations = createAsyncThunk(
//   'user/getRealtimeConversations',
//   async (user, { rejectWithValue }) => {
//     try {
//       const db = getFirestore(app);
//       const conversationsCollection = collection(db, 'conversations');
//       const querySnapshot = await db.collection('conversations')
//         .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
//         .orderBy('createdAt', 'asc')
//         .get();

//       const conversations = querySnapshot.docs.map(doc => doc.data());
//       return conversations;
//     } catch (error) {
//       console.error('Failed to get realtime conversations:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRealtimeUsers.fulfilled, (state, action) => {
        console.log('fillfulled',action.payload);
        state.users = action.payload;
      })
      .addCase(updateMessage.fulfilled, (state) => {
        // Handle successful message update if needed
      })
      .addCase(getRealtimeConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      });
  },
});

export const selectUsers = (state) => state.user.users;
export const selectConversations=(state)=>state.user.conversations;
export default userSlice.reducer;
