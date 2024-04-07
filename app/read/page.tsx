"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./read.module.css";
import Comment from "../components/Comment/Comment";

import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";

function ReadPage() {
    // 댓글
    const [inputComment, setInputComment] = useState("");
    const [saveComment, setSaveComment] = useState("");

    const handleInputComment = (event: ChangeEvent<HTMLInputElement>) => {
        setInputComment(event.target.value);
    };

    const comment = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInputComment(inputComment);
    };

    return (
        <div className={styles.container}>
            <div className={styles.postBox}>
                <div className={styles.postHeaderBox}>
                    <p className={styles.postWriter}>작성자</p>
                    {/* 작성자에게만 보이는 버튼 */}
                    <div className={styles.postBtns}>
                        <div className={styles.postEditBtn}>수정</div>
                        <div className={styles.postDelBtn}>삭제</div>
                    </div>
                </div>
                <div className={styles.postTitle}>제목입니다</div>
                <div className={styles.postContent}>본문입니다</div>
                <div className={styles.postFooterBox}>
                    <div className={styles.postReactionBox}>
                        <BsHeartFill />
                        <p className={styles.postLike}>20</p>
                        <BsChatDotsFill />
                        <p className={styles.postComment}>100</p>
                    </div>
                    <p className={styles.postDate}>2024/04/04</p>
                </div>
            </div>

            {/* 댓글 컴포넌트 */}
            <div className={styles.commentBox}>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>

            {/* 리액션바 : 좋아요, 댓글 */}
            <div className={styles.reactionBarBg}>
                <div className={styles.reactionBarBox}>
                    <div className={styles.reactionLike}>
                        <BsHeartFill className={styles.reactionLikeIcon} />
                    </div>
                    <form onSubmit={comment} className={styles.commentBarForm}>
                        <input
                            type="text"
                            placeholder="여기에 댓글을 입력하세요."
                            value={inputComment}
                            onChange={handleInputComment}
                            className={styles.commentBar}
                        />
                        <button type="submit" className={styles.submitBtn}>
                            저장
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReadPage;
