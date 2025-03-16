import { auth, db } from "../../Backend/Auth/firebase.js"; // Import Firestore
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

// Sign up with email and password
export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  name
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Save user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name,
    email: email,
    dob: "", // Default empty date of birth
    contactNo: "", // Default empty contact number
    bio: "", // Default empty bio
    profileImage: "", // Default empty profile image
    createdAt: new Date(),
  });

  return userCredential;
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if the user already exists in Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    // If the user doesn't exist, create a new document
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      dob: "", // Default empty date of birth
      contactNo: "", // Default empty contact number
      bio: "", // Default empty bio
      profileImage: user.photoURL || "", // Use Google profile image if available
      createdAt: new Date(),
    });
  } else {
    // If the user exists, merge the new data with the existing data
    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL || userDoc.data().profileImage, // Keep existing profile image if no Google photo
      },
      { merge: true } // Merge the data instead of overwriting
    );
  }

  return result;
};

// Sign out
export const doSignOut = () => {
  return auth.signOut();
};

// Password reset
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Password change
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// Send email verification
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/AdminDashboard`,
  });
};
