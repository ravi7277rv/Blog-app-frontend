import React, { useContext,useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import { UserContext } from '@/context/UserContext';

const Post = ({ data }) => {

    const { userData } = useContext(UserContext);

console.log(data)
    const [showOption, setShowOption] = useState(false);

    const handlClickedOption = () => {
        if(showOption === false){
            setShowOption(true);
        }else{
            setShowOption(false)
        }
    }

    return (
        <div className="colTwo2-1">
            <div className="colTwouserdetail">
                <div className="nameimage">
                <Image src={userData ? (`${userData.avatar.url}`) : ("/images/img_avatar.png")} className='imgUser' alt='User image' width={30} height={30} />
                <h4>{userData.name}</h4>
                </div>
                <div className="optionedit" onClick={handlClickedOption}>
                    <MoreHorizIcon className='option' />

                    {
                        showOption &&
                        <div className="editDeleteOption">
                            <span>Edit Post</span>
                            <span>Delete Post</span>
                        </div>
                    }
                </div>
            </div>
            <div className="colTwocaption">
                <h3>{data && data.caption}</h3>
            </div>
            <div className="colTwoImgVideo">
                <Image src={data ? (`${data.image.url}`) : ("/images/img_avatar.png")} className='imagevideo' alt='Post images' width={100} height={100} />
            </div>
            <div className="colTwoaction">
                <div className="likes">
                    <span>
                        <ThumbUpIcon className='likeIcon liked' />
                    </span>
                    <span>likes 25K</span>
                </div>
                <div className="comment">
                    <span>
                        <AddCommentIcon className='commentIcon' />
                    </span>
                    <span>comments</span>
                </div>
                <div className="share">
                    <span>
                        <ShareIcon className='shareIcon' />
                    </span>
                    <span>share 20K</span>
                </div>
            </div>
        </div>
    )
}

export default Post
