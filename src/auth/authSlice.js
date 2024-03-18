import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase/config';

const auth = getAuth(app);
const db = getFirestore(app);

const initialState = {
  name:'',
  email:'',
  authenticating: false,
  authenticated: false,
  error: null
};

// export const signUpUserAsync = createAsyncThunk(
//   'user/signUpUser',
//   async (user) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
//       console.log(userCredential.user);
//       return userCredential.user;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// );

export const signUpUserAsync = createAsyncThunk(
  'auth/signUpUser',
  async (user, { rejectWithValue }) => {
    try {
      // Sign up the user
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

      // Update the user's profile (display name)
      await updateProfile(auth.currentUser, {
        displayName: `${user.name}`
      });

      // Set the user's data in the database
      const db = getFirestore(app);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: user.name,
        email: user.email,
        createdAt: new Date(),
        isOnline: true,
        uid: userCredential.user.uid
      });

      // Return only the necessary information
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: user.name,
        isOnline:true
      };

      console.log("heheheheh", userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        return rejectWithValue('Email is already in use');
      } else {
        console.log(error);
        return rejectWithValue('Signup failed');
      }
    }
  }
);

export const signInUserAsync = createAsyncThunk(
  'auth/signInUser',
  async (user, { rejectWithValue }) => {
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);

      // Update the user's online status in the database
      const db = getFirestore(app);
      await updateDoc(doc(db, 'users', userCredential.user.uid), {
        isOnline: true
      });

      // Return only the necessary information
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        isOnline:true
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      console.log("Signed in user:", userInfo);
      return userInfo;
    } catch (error) {
      console.log("Sign in error:", error);
      // Handle specific errors
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        return rejectWithValue('Invalid email or password');
      } else {
        return rejectWithValue('Sign in failed');
      }
    }
  }
);

export const isLoggedInUserAsync = createAsyncThunk(
  'auth/isLoggedInUser',
  async ({ rejectWithValue }) => {
    try {
      // Check if user data is present in local storage
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

      if (user) {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isOnline:user.isOnline
        };
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('User data not found');
    }
  }
);

export const logOutAsync = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      // Check if user data is present in local storage
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

      if (!user) {
        throw new Error('User data not found');
      }

      // Update the user's online status in the database
      const db = getFirestore(app);
      await updateDoc(doc(db, 'users', user.uid), {
        isOnline: false
      });

      // Sign out the user
      await auth.signOut();


      // Clear local storage
      localStorage.clear();

      return null; // Return null to indicate success
    } catch (error) {
      console.error('Logout error:', error);
      return rejectWithValue(error.message);
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.authenticating = true;
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        state.authenticating = false;
        state.authenticated = true;
        state.name = action.payload.displayName; // Assuming displayName is part of the user object
        state.email = action.payload.email;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.authenticating = false;
        state.error = action.error.message;
      }) .addCase(signInUserAsync.pending, (state) => {
        state.authenticating = true;
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        state.authenticating = false;
        state.authenticated = true;
        state.name = action.payload.displayName; // Assuming displayName is part of the user object
        state.email = action.payload.email;
      })
      .addCase(signInUserAsync.rejected, (state, action) => {
        state.authenticating = false;
        state.error = action.error.message;
      }) .addCase(isLoggedInUserAsync.fulfilled, (state, action) => {
        state.authenticating = false;
        state.authenticated = true;
        state.name = action.payload.displayName; // Assuming displayName is part of the user object
        state.email = action.payload.email;
      })
      .addCase(isLoggedInUserAsync.rejected, (state, action) => {
        state.authenticating = false;
        state.error = action.error.message;
      }).addCase(logOutAsync.pending, (state) => {
        state.authenticating = true;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.authenticating = false;
        state.authenticated = false;
        state.name = '';
        state.email = '';
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.authenticating = false;
        state.error = action.error.message;
      });
  },
});

 export const selectAuthenticating = (state) => state.auth.authenticating;
 export const selectAuthenticated = (state) => state.auth.authenticated;
 export const selectUserName = (state) => state.auth.name;
// export const selectUserInfoStatus = (state) => state.user.status;

export default authSlice.reducer;
