import React from "react";
import styles from "./Comment.module.css";

function Comment() {
    return (
        <div className={styles.container}>
            <p className={styles.username}>작성자</p>
            <p className={styles.content}>댓글 내용</p>
            <p className={styles.date}>2024/04/05</p>
        </div>
    );
}

export default Comment;
