import { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,  signOut} from "firebase/auth";
import app from "../firebaseconfig";
import { LoginContext} from "../AppContext/Context";
import { getFirestore,doc, updateDoc, setDoc} from "@firebase/firestore";
import {BrowserRouter, Routes, Route, Redirect, Link } from "react-router-dom";



function SignIn(){
    const auth = getAuth(app);
    const {user,setUser} = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const db = getFirestore(app);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log('currentuser', currentUser);
        
    });

    // const isLoggedIn = auth.currentUser ? true:false

    const signup = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Successful signup")
            setDoc(doc(db, "users", auth.currentUser.uid), {
                isWebsiteLogin: false,
                isVRLogin: false
              });

        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode)
        });
    }

    const signin = () => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // console.log(user);
            let docRef = doc(db, "users", user?.uid);
            updateDoc(docRef,{
                isWebsiteLogin:true
            } ).then(response => {
                console.log("signinupdated")
            }).catch(error =>{
                console.log(error.message)
            })
            alert("Sucessfully signed in")
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode)

        });
    }

    const signout = async () => {
        let docRef;
        docRef = doc(db, "users", user?.uid)
        await updateDoc(docRef,{
            isWebsiteLogin:false
          } ).then(response => {
            console.log("signoutupdated")
          }).catch(error =>{
            console.log(error.message)
          })
        
          
        await signOut(auth);
        alert("Successful signout")
    };

    return (
        <div className = "bg">
            <div className="center signinBox">
            {/* <form id="signin"> */}
                <h1 className="centerText">VocalizeX</h1>
                <input id ="signinField" type = "email" placeholder='Email' name="email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input id="password signinField" placeholder='Password' type = "password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
                {/*<button className="loginBtn" onClick={signup}> Create Account</button>*/}
                <button className="loginBtn" onClick={signin} > Login</button>
                <button className="loginBtn" onClick={signout} > SignOut</button>
                <p className="centerText">Don't have an account? <Link to='/signup' target='_self' className="purple"><strong>Sign up</strong></Link></p>
            {/* </form> */}
            </div>
      </div>
    )
}

export default SignIn

