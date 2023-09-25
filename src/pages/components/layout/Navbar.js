import Axios from '@/utils/Axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GroupIcon from '@mui/icons-material/Group';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportIcon from '@mui/icons-material/Support';
import Image from 'next/image';
import { useContext,  useEffect,  useState } from 'react';
import { UserContext } from '@/context/UserContext';


export default function Navbar() {

  const [profiledropdown, setProfiledropdown] = useState(false);
  const { userData, logout } = useContext(UserContext);

  

   
  const handleDropdown = () => {
    if (profiledropdown === false) {
      setProfiledropdown(true);
    } else {
      setProfiledropdown(false);
    }
  };

  const handleLogout = () => {

    Axios.get("/logout")
        .then((response) => {
            console.log(response);
            if (response.data && response.data.success === true && response.data.message) {
                toast.success(response.data.message);
            };
            logout();
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.success === false && error.response.data.message) {
                toast.error(error.response.data.message);
            };
        });
};

  return (
    
      <nav className='navbardiv'>
      <div className="navdiv1">
        <h3>BlogApp</h3>
        <HomeOutlinedIcon className='homeIcon' />
      </div>
      <div className="navdiv2">
        <input
          type="text"
          placeholder='Search here for people'
        />
        <SearchOutlinedIcon className='searchIcon' />
      </div>
      <div className="navdiv3">
        <GroupIcon className='gourpIcon hover' />
        <MessageOutlinedIcon className='messageIcon hover' />
        <NotificationsNoneIcon className='notifyIcon hover' />
        <div className="img" onClick={handleDropdown}>
          <Image src={userData ? (`${userData.avatar.url}`) : ("/images/img_avatar.png")} alt='Profile Image' className='profielImage' width={50} height={50} />

          {
            profiledropdown &&
            <div className="profiledropdown">
              <div className="profieldrop1">
                <Image src={userData ? (`${userData.avatar.url}`) : ("/images/img_avatar.png")} className='InprofileImage' alt='profiel photo' width={40} height={40} />
                <div className="profilecontent">
                  <span className='uname'>{userData && userData.name.split(" ")[0]}</span>
                  <span className='urole'>{userData && userData.role}</span>
                </div>
                { userData && 
                <div className="profileactive">

                </div>
                }
              </div>

              <div className="profiledrop2">
                <div className="profiledrop2div1">
                  <div className="profdiv">
                    <PersonIcon className='personIcon' />
                    <span>Profile</span>
                  </div>
                  <div className="profdiv2">
                    <SettingsIcon className='settingIcon' />
                    <span>Settings</span>
                  </div>
                  <div className="profdiv3">
                    <SupportIcon  className='suportIcon'/>
                    <span>Help</span>
                  </div>
                  <div className="profdiv4">
                    <HelpOutlineIcon  className='helpIcon' />
                    <span>FAQ</span>
                  </div>
                </div>
                <div className="profiledropd2div2">
                  <div className="logoutdiv">
                    <LogoutIcon className='logoutIcon' />
                    <span onClick={handleLogout}>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
    
  )
}
