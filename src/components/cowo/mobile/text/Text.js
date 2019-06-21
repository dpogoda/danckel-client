import React from 'react';
import styles from './text.module.css';

const Layout = ({ props: { level, text } }) => (
  <span className={styles[level]}>{text}</span>
);

export default Layout;
