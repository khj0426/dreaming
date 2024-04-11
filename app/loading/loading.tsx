import Image from 'next/image';
import React from 'react';
import styles from './loading.module.css';

function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingPage;
