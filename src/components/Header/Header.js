
// File: src/components/Header/Header.js
// Description:
// Component renders the header section of the page, including a main title. 
// Header is styled using the associated CSS module.
// Component provides a simple, centered title for the top of the page.

import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.headerContainer} data-testid="headerContainer">
          <header className={styles.header} data-testid="header">
            <h1 className={styles.headerH1}>One Love</h1>
          </header>
        </div>
);
};

export default Header;
