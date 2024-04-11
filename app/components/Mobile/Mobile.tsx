import React from "react";
import styles from "./Mobile.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

function LinkToReport() {
    return (
        <div className={styles.container}>
            <div className={styles.messageBox}>
                <img src="./logo_dreaming.png" className={styles.logoImg} />
                <p className={styles.message}>
                    드리밍은 모바일 화면만 지원합니다.
                </p>
                <p className={styles.message}>모바일로 접속해주세요!</p>
            </div>
        </div>
    );
}

export default LinkToReport;
