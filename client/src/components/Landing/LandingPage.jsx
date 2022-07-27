import {React} from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'
import GIT1 from '../Multimedia/GIT1.png'
import insta from '../Multimedia/insta.png'
import linke from '../Multimedia/linke.png'

export default function LandingPage(){
    return(
        <div className={styles.landing}>
            <div className={styles.Hojaizquierda}>

            </div>
            <div className={styles.HojaDerecha}>
            <h3 style={{marginTop: '8vh', fontSize: "25px"}}>About Me</h3>
            <div style={{marginRight: '4vh', marginLeft: '4vh', textAlign: 'justify', marginBottom: "1vh"}}>
            <p>Hi! My name is Agustin. I'm a full stack developer student. I made this project while studying in Henry. The same was done using Spoonacular, a food API.</p>
            <p>This project required knowledge at React, Redux, NodeJs, Express and PostgresSQL, knowledge that I acquired in my course, but also required learn soft skills like Teamwork, Ability to solve problems and Patience</p>  
            <p>I hope you can enjoy it and if you want to know more about me, you can contact me through the following links. Cheers!</p>

            </div>

            {/* <h3 style={{textAlign: 'center', marginTop: '20vh'}}> Contact Me</h3> */}
            <div className={styles.box}>
                <a target='_blank' href="https://github.com/AgustinKassargian">
                    <img src={GIT1} alt='imagen' className={styles.logos}/>
                </a>
                <a target='_blank' href="https://www.instagram.com/agus_kassargian/">
                    <img src={insta} alt='imagen' className={styles.logos}/>
                </a>
                <a target='_blank' href="https://www.linkedin.com/in/agustin-kassargian-45b548237/">
                    <img src={linke} alt='imagen' className={styles.logos}/>
                </a>

            </div>
            
            <div style={{width: '100%'}}>
               
            <h3 style={{textAlign: 'end', marginTop:'3vh', marginRight:'2vw'}}><Link className={styles.link} to ='/home'>Continue</Link></h3>
            
            </div>
            </div>
        </div>
    )
}