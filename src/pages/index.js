import { use, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Axios from "@/utils/Axios";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";


export default function Home() {

  const router = useRouter()

  const { userData, setUserData } = useContext(UserContext);

  const [allowView, setAllowView] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    passowrd: ""
  });

  const { name, email, phone, password } = user;

  const [avatar, setAvatar] = useState("/images/img_avatar.png");
  const [avatarPreview, setAvatarPreview] = useState("/images/img_avatar.png");


  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [string, setString] = useState("password");

  const [showLogin, setShowLogin] = useState(true);



  const handlePassVisibilityOn = () => {
    console.log(`clidked on icon`)
    setShowPassword(false);
    setString("password");
  };

  const handlePassVisibilityOff = () => {
    console.log(`cliked off icon`)
    setShowPassword(true);
    setString("text");
  }

  const handleToGoLoginOrSignup = () => {

    if (showLogin === true) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }

    setLoginEmail("");
    setLoginPassword("");
    setUser("");
  };


  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  const handleLoginUser = async() => {

    const data = {
      email:loginEmail,password:loginPassword
    }

     await Axios.post("/login/user",data)
    .then((response) => {
      console.log(response);
      let user = {...response.data.data,token:response.data.token}
      console.log(`Login user : ${user}`)
      setUserData(user);
        sessionStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("user",JSON.stringify(user));
        if (response.data && response.data.success === true && response.data.message) {
          toast.success(response.data.message);
        };
        router.push("/dashboard");
      }).catch((error) => {
        console.log(error)
        if (error.response && error.response.data && error.response.data.success === false && error.response.data.message) {
          toast.error(error.response.data.message);
        };
      })

  };

  const handlerRgisterUser = async () => {

    const data = {
      name, email, phone, avatar, password
    };

      await Axios.post("/create/user", data)
      .then((response) => {
        console.log(response);
        let user = {...response.data.data,token:response.data.token}
        setUserData(user);
        sessionStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("user",JSON.stringify(user));
        if (response.data && response.data.success === true && response.data.message) {
          toast.success(response.data.message);
        };
        router.push("/dashboard");
      }).catch((error) => {
        console.log(error)
        if (error.response && error.response.data && error.response.data.success === false && error.response.data.message) {
          toast.error(error.response.data.message);
        };
      })
  };


  useEffect(() => {
    let user = localStorage.getItem("user") || sessionStorage.getItem("user");
    user ? router.push("/dashboard") : setAllowView(true);
  },[router])

  return (

    <>
      {
        allowView &&
        <div className="logindiv">
          <div className="textContent">
            <Image src={"/images/pngegg.png"} alt="useruplod image" width={500} height={400} className="img" />
            <div className="text">
              <h3>Triluxo Technologies Private Limited</h3>
              <p>Triluxo Travels is a leading tour operator and travel agency in India. It provides you with all the easiest and affordable ways to explore India.</p>
            </div>
          </div>

          {
            showLogin ? (
              <>
                <div className="loginContent">
                  <div className="logincard">

                    <div className="emaildiv">
                      <MailOutlineIcon className="mailIcon" />
                      <input
                        type="email"
                        placeholder="Email-Id"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>

                    <div className="passdiv">
                      {
                        showPassword ? (
                          <>
                            <VisibilityIcon className="passIcon" onClick={handlePassVisibilityOn} />
                          </>
                        ) : (
                          <>
                            <VisibilityOffIcon className="passIcon" onClick={handlePassVisibilityOff} />

                          </>
                        )
                      }
                      <input
                        type={string}
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <div className="buttondiv">
                      <button type="submit" onClick={handleLoginUser}>Login</button>
                    </div>
                    <div className="forgotPassdiv">
                      <h5 onClick={""}><i>Forgot Passowrd</i> </h5>
                    </div>
                    <div className="goToLogin">
                      <h3>Do not have Account <span onClick={handleToGoLoginOrSignup}>SignUp</span> here</h3>
                    </div>

                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="registerContent">
                  <div className="registercard">

                    <div className="namediv">
                      <PersonIcon className="personIcon" />
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="emaildiv">
                      <MailOutlineIcon className="mailIcon" />
                      <input
                        type="email"
                        placeholder="Email-Id"
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="phonediv">
                      <PhoneIphoneIcon className="phoneIcon" />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        name="phone"
                        value={phone}
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="passdiv">
                      {
                        showPassword ? (
                          <>
                            <VisibilityIcon className="passIcon" onClick={handlePassVisibilityOn} />
                          </>
                        ) : (
                          <>
                            <VisibilityOffIcon className="passIcon" onClick={handlePassVisibilityOff} />

                          </>
                        )
                      }
                      <input
                        type={string}
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="imagediv">
                      <Image src={avatarPreview} alt="Avatar Preview" className="profileImage" width={100} height={100} />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="buttondiv">
                      <button type="submit" onClick={handlerRgisterUser}>Register</button>
                    </div>
                    <div className="goToLogin">
                      <h3>Already having Account <span onClick={handleToGoLoginOrSignup}>LogIn</span></h3>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      }
    </>

  )
}
