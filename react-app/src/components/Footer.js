import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css"
import dog from "./main/dog.png"


const Footer = () => {
    return (
        <div className="footer__container">
            <div className="footer__links">
                <div className="footer__letters letter__e">
                <a href="https://github.com/earlwoo">Earl Woo
                    </a></div>

                <a href="https://github.com/earlwoo/My-Neighborkhood">
                    <FaGithub id="github" />
                </a>
                <a href="https://www.linkedin.com/in/earl-woo-12737a208/">
                    <FaLinkedin id="github" />
                </a>
            </div>
            <img className="bork" alt="dog-icon" src={dog} ></img>
            <div className="title">© 2021 My Neighborkhood. No rights reserved.</div>
        </div>
    )

}


export default Footer
