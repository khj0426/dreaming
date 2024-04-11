"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./report.module.css";
import { GrMoney } from "react-icons/gr";
import { UserProps } from "../diary/page";
import { getUser } from "../api/service/user";
import { getLotto } from "../api/service/lotto";
import { getReport } from "../api/service/report";

interface ReportProps {
    allCount: number;
    sharedCount: number;
    notSharedCount: number;
    likeCount: number;
    commentCount: number;
}

function ReportPage() {
    const [user, setUser] = useState<UserProps | null>(null);
    const [data, setData] = useState<ReportProps | null>(null);

    // [api] 로그인한 유저 정보 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getUser();
                setUser(data.user);
            } catch (error) {
                console.error("유저 정보를 불러오는 데 실패했습니다.", error);
            }
        })();
    }, []);

    // [api] 통계
    useEffect(() => {
        (async () => {
            try {
                const data = await getReport();
                console.log(data);
                setData(data);
            } catch (error) {
                console.error("통계 정보를 불러오는 데 실패했습니다.", error);
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <img src="./logo_dreaming.png" className={styles.logoImg} />
            <div className={styles.reportTitleBox}>
                <p className={styles.reportTitle}>현재 드리밍에는</p>
                <p className={styles.reportTitle}>
                    <span className={styles.important_gray}>총 ****개</span>의
                    글이 있어요!
                </p>
                <div className={styles.chart}></div>
            </div>
            <div className={styles.reportBox}>
                <img src="./report_post.png" className={styles.iconImg} />
                <div className={styles.textBox}>
                    <p className={styles.reportText}>
                        지금까지,{" "}
                        <span className={styles.important_yellow}>
                            {user?.name} 님
                        </span>
                        은
                    </p>
                    <p className={styles.reportText}>
                        <span className={styles.important_blue}>**</span>개의
                        글을 작성하셨네요
                    </p>
                </div>
            </div>
            <div className={styles.reportBox}>
                <div className={styles.textBox2}>
                    <p className={styles.reportText}>
                        <span className={styles.important_yellow}>
                            {user?.name} 님
                        </span>
                        이 받은
                    </p>
                    <p className={styles.reportText}>
                        좋아요는 총{" "}
                        <span className={styles.important_blue}>**</span>개
                        입니다!
                    </p>
                </div>
                <img src="./report_like.png" className={styles.iconImg} />
            </div>
            <div className={styles.reportBox}>
                <div className={styles.textBox2}>
                    <p className={styles.reportText}>
                        <span className={styles.important_yellow}>
                            {user?.name} 님
                        </span>
                        의 글에 달린
                    </p>
                    <p className={styles.reportText}>
                        댓글은 총{" "}
                        <span className={styles.important_blue}>**</span>개
                        입니다!
                    </p>
                </div>
                <img src="./report_comment.png" className={styles.iconImg} />
            </div>
        </div>
    );
}

export default ReportPage;
