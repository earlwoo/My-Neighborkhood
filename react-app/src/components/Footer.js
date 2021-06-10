import React from 'react'
import { Container } from "@chakra-ui/react"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css"
import dog from "./main/dog.png"


const Footer = () => {
    return (
        <div className="footer__container">
            <img src={dog} ></img>
            <div>My Neighborkhood</div>
            <div className="footer__links">
                <div className="footer__letters letter__e">Earl Woo</div>

                <a href="https://github.com/earlwoo/My-Neighborkhood">
                    <FaGithub id="github" />
                </a>
                <a href="https://www.linkedin.com/in/earl-woo-12737a208/">
                    <FaLinkedin id="github" />
                </a>
            </div>
        </div>
    )

}


export default Footer
