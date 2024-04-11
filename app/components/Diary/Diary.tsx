import React from "react";
import styles from "./Diary.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

import { BsQuote } from "react-icons/bs";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";

export interface DiaryType {
    id: string;
    title: string;
    isShare: boolean;
    contents: string;
    writerId: number;
    writerName: string;
    writerImage: string;
    like: number;
    updated_At: string;
}
export interface DiaryProps {
    diaries: DiaryType[];
    total: number;
}

const Diary = ({
    id,
    title,
    isShare,
    contents,
    writerId,
    like,
    writerImage,
    writerName,
    updated_At,
}: DiaryType) => {
    console.log(like);
    return (
        //writerId 넣어서 read에 보내기
        <Link href={`/read/${id}`}>
            <div
                className={styles.container}
                data-aos="fade-up"
                data-aos-duration="1500"
            >
                <p className={styles.title}>
                    {title}
                    {!isShare ? <MdLock className={styles.lockIcon} /> : null}
                </p>
                <p className={styles.content}>{contents}</p>
                <div className={styles.postFooter}>
                    <div className={styles.postInfo}>
                        <p>
                            <BsFillPersonFill className={styles.postInfoIcon} />
                            {writerName}
                        </p>
                        {isShare ? (
                            <>
                                <p>
                                    <BsHeartFill
                                        className={styles.postInfoIcon}
                                    />
                                    {like}
                                </p>
                                {/* <p>
                                    <BsChatDotsFill
                                        className={styles.postInfoIcon}
                                    />
                                    200
                                </p> */}
                            </>
                        ) : null}
                    </div>
                    <p className={styles.date}>{updated_At}</p>
                </div>
            </div>
        </Link>
    );
};

export default Diary;
