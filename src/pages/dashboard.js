import { UserContext } from '@/context/UserContext'
import  { useContext, useEffect, useState } from 'react';
import Axios from '@/utils/Axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer';
import Image from 'next/image';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import Post from './components/Home/Post';

const Dashboard = () => {

    const router = useRouter();

    const { userData } = useContext(UserContext);

    const [allowView, setAllowView] = useState(false);
    const [caption, setCaption] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        let user = sessionStorage.getItem("user") || localStorage.getItem("user");
        user ? setAllowView(true) : router.push("/")

    }, [router]);



    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const handlPostUpload = async() => {

        if(!avatar) return;

        const data = {
            caption, avatar
        }

        console.log(data)

        await Axios.post("/post/upload", data, {
            headers: {
                Authorization: userData?.token
            }
        })
            .then((response) => {
                console.log(response);

                let post = response.data.data;
                let newPosts = [post, ...posts];
                setPosts(newPosts);
                if (response.data && response.data.success === true && response.data.message) {
                    toast.success(response.data.message)
                }
            }).catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.success === false && error.response.data.message) {
                    toast.error(error.response.data.message);
                };
            })
    }


    const fetchAllUserPosts = async() => {

        await Axios.get("/fetchAllPosts", {
            headers: {
                Authorization: userData?.token,
            }
        })
            .then((response) => {
                console.log(response);
                setPosts(response.data.data);
            }).catch((error) => {
                console.log(error);
            })
    }   
           
    useEffect(() => {

       fetchAllUserPosts();
        
    },[]);

    const [token, setToken] = useState(null);

    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("user")) || JSON.parse(localStorage.getItem("user"))
        if(user) setToken(user.token)

        if(token) fetchAllUserPosts();

    },[token])
 

    return (
        <>
            <Navbar />
            {
                allowView &&
                <div className='container'>
                    <div className="row">
                        <div className="colOne">

                        </div>
                        <div className="colTwo">
                            <div className="colTwo1">
                                <div className="createpost">
                                    <h4>Whats new share ?</h4>
                                </div>
                                <div className="inputcaption">
                                    <input
                                        type="text"
                                        placeholder='Enter Post Caption here'
                                        value={caption}
                                        required
                                        onChange={(e) => setCaption(e.target.value)}
                                    />
                                </div>
                                <div className="imageupload">
                                    <div className="images">
                                        {avatarPreview &&
                                            <Image src={avatarPreview} alt="Avatar Preview" className="profileImage" width={50} height={50} />
                                        }
                                        <label htmlFor="avatar" style={{ cursor: 'pointer' }}>
                                            <ImageIcon className='imageIcon' />
                                        </label>
                                        <input
                                            type="file"
                                            id="avatar"
                                            name="avatar"
                                            accept="image/*"
                                            required
                                            style={{ display: 'none' }}
                                            onChange={handleAvatarChange}
                                        />
                                        
                                    </div>
                                    <button onClick={handlPostUpload}><span>Post</span> <SendIcon /></button>
                                </div>
                            </div>
                            <div className="colTwo2">
                               {
                                posts && posts.map((data) => (
                                    <Post key={data._id}  data={data} />
                                ))
                               }
                            </div>
                        </div>
                        <div className="colThree">

                            
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default Dashboard
