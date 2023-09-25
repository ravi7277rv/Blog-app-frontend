import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';

export default function Footer(){


    
    return(
       
       
            <footer className="footer">
            <div className="footerdiv1">
                <p>Copyright reserved By Triluxo 2023</p>
            </div>
            <div className="footerdiv2">
                <div className="div1">
                <FacebookIcon  className='icon'/>
                </div>
                <div className="div2">
                <InstagramIcon className='icon' />
                </div>
                <div className="div3">
                <LinkedInIcon className='icon' />
                </div>
                <div className="div4">
                <TwitterIcon className='icon' />
                </div>
               
            </div>
        </footer>
        
        
    )
}