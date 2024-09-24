
/*
    File: src/components/Footer/Footer.js
    Description:
        Component renders the footer section of the website, including the name and navigation links for contact information and CV.
        Styles are applied from the associated CSS module.
*/

import React, { useEffect } from 'react';

// css
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footerContainer} data-testid="footerContainer">
        <footer className={styles.footer} data-testid="footer">
            <h2 className={styles.footerH2}>Rowan Van Zyl</h2>
            <nav className={styles.nav}>
                <a className={styles.navA}>Contact Me</a> {/* Contact Me, CV */}
                <a className={styles.lastNavOption}>CV&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                {/*
                <a>About Me</a>
                <a>Projects</a>
                <a>Skills</a>
                <a id="last-nav-option">Contact</a>
                */}
            </nav>
        </footer>
        </div>
    );
};

export default Footer;
