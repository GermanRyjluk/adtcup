import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

const initialState = {
    auth: false,
    currentUser: {
        uid: '',
        email: '',
        emailVerified: false,
        displayName: '',
        photoURL: '',
    },
    loading: false,
}

export const registerAccount = createAsyncThunk('auth/register', async ({ newUserEmail, newUserPassword, newUserName, gender }) => {
    try {
        await createUserWithEmailAndPassword(
            auth,
            newUserEmail,
            newUserPassword
        )
            .then(async (userCredential) => {
                const docRef = setDoc(
                    doc(db, "users/" + userCredential.user.uid),
                    {
                        name: newUserName,
                        email: newUserEmail,
                        photoURL: gender == 'm' ? "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg" : gender == 'f' ? 'https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg' : gender == 'n' ? 'https://media.istockphoto.com/id/1326784239/vector/gender-neutral-profile-avatar-front-view-of-an-anonymous-person-face.jpg?s=612x612&w=0&k=20&c=_uqGw8h0Zhd3m4ImdedpdXZ8-UPxejbc2lGP5J5iTRs=' : null,
                    }
                );
                // console.log(docRef.name); //undefined :(
                // navigation.navigate('Home', {
                //   userData: userCredential.user.email,
                // });
                await updateProfile(auth.currentUser, {
                    displayName: newUserName,
                    photoURL: gender == 'm' ? "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg" : gender == 'f' ? 'https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg' : gender == 'n' ? 'https://media.istockphoto.com/id/1326784239/vector/gender-neutral-profile-avatar-front-view-of-an-anonymous-person-face.jpg?s=612x612&w=0&k=20&c=_uqGw8h0Zhd3m4ImdedpdXZ8-UPxejbc2lGP5J5iTRs=' : null,
                }).catch((err) => console.log(err));

                await signInWithEmailAndPassword(auth, newUserEmail, newUserPassword).then(async () => {
                    await sendEmailVerification(auth.currentUser).catch((e) => console.error("Verification error: " + e))

                }).catch((e) => console.error("Signin error: " + e))
                Alert.alert("Email di verificazione inviata", "Verifica il tuo account per poter accedere ai servizi ADT CUP!");

            })
            .catch((e) => console.log(e));

    } catch (e) {
        console.log("Errore registrazione: ", e.code);
        if (e.code == "auth/email-already-in-use") {
            Alert.alert("Email già utilizzato", "Torna alla schermata di login per recuperare la tua password o scegli una nuova mail");
        }
        if (e.code == "auth/invalid-email") {
            Alert.alert("Formato email errato (esempio@mail.com)");
        }
    }
    let user = auth.currentUser;
    // console.log("User: ", user);
    return user;
})
export const loginAccount = createAsyncThunk('auth/login', async ({ email, password }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        if (e.code === 'auth/user-not-found') {
            Alert.alert('Email incorretto o inesistente');
        } else if (e.code === 'auth/wrong-password') {
            Alert.alert('Password errata');
        }
        console.error("Errore login: ", e.code);
    }
    let user = auth.currentUser;
    console.log("User: ", user);
    return user;
})

export const logoutAccount = createAsyncThunk('auth/logout', async () => {
    let user = auth.currentUser;
    if (user) {
        try {
            await auth.signOut();
        } catch (e) {
            console.error(e);
        }
    }
    return {};
})

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: state => {
            state.auth = true
        },
    },
    extraReducers: builder => {
        //Register
        builder.addCase(registerAccount.pending, state => {
            state.loading = true;
            state.auth = false;
            state.currentUser = {
                uid: '',
                email: '',
                emailVerified: false,
                displayName: '',
                photoURL: '',
            };
        })
        builder.addCase(registerAccount.fulfilled, (state, actions) => {
            state.loading = false;
            state.auth = true;
            state.currentUser = {
                uid: actions.payload.uid,
                email: actions.payload.email,
                emailVerified: actions.payload.emailVerified,
                displayName: actions.payload.displayName,
                photoURL: actions.payload.photoURL,
            };
        })
        builder.addCase(registerAccount.rejected, state => {
            state.loading = false;
            state.auth = false;
            state.currentUser = {
                uid: '',
                email: '',
                emailVerified: false,
                displayName: '',
                photoURL: '',
            };
        })

        //Login
        builder.addCase(loginAccount.pending, state => {
            state.loading = true;
            state.auth = false;
            state.currentUser = {
                uid: '',
                email: '',
                emailVerified: false,
                displayName: '',
                photoURL: '',
            };
        })
        builder.addCase(loginAccount.fulfilled, (state, actions) => {
            state.loading = false;
            state.auth = true;
            state.currentUser = {
                uid: actions.payload.uid,
                email: actions.payload.email,
                emailVerified: actions.payload.emailVerified,
                displayName: actions.payload.displayName,
                photoURL: actions.payload.photoURL,
            };
        })
        builder.addCase(loginAccount.rejected, state => {
            state.loading = false;
            state.auth = false;
            state.currentUser = {
                uid: '',
                email: '',
                emailVerified: false,
                displayName: '',
                photoURL: '',
            };
        })

        //Logout
        builder.addCase(logoutAccount.fulfilled, (state, actions) => {
            state.loading = false;
            state.auth = false;
            state.currentUser = {
                uid: '',
                email: '',
                emailVerified: false,
                displayName: '',
                photoURL: '',
            };
        })
    }
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;