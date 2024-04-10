import React from "react";
import styles from "./Comment.module.css";

export interface CommentProps {
    id: string;
    comment: string;
    created_At: string;
    diaryId: string;
    updated_At: string;
    writerId: string;
}

const Comment: React.FC<CommentProps> = ({
    id,
    comment,
    diaryId,
    updated_At,
    writerId,
}) => {
    return (
        <div className={styles.container}>
            <p className={styles.username}>{writerId}</p>
            <p className={styles.content}>{comment}</p>
            <p className={styles.date}>{updated_At}</p>
        </div>
    );
};

export default Comment;
