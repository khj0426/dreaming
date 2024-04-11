"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./report.module.css";
import { GrMoney } from "react-icons/gr";
import { UserProps } from "../diary/page";
import { getUser } from "../api/service/user";
import { getLotto } from "../api/service/lotto";
import { getReport } from "../api/service/report";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

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

    useEffect(() => {
        (async () => {
            try {
                const user = await getUser(); // [api] 로그인한 유저 정보 get 요청
                const data = await getReport(); // [api] 통계
                setUser(user.user);
                setData(data);
                // console.log(data.allCount);
            } catch (error) {
                console.error("유저 정보를 불러오는 데 실패했습니다.", error);
            }
        })();
    }, []);

    // 차트
    const chart = {
        labels: ["전체 공개 꿈 일기", "나만 보기 꿈 일기"],
        datasets: [
            {
                data: [data?.sharedCount, data?.notSharedCount],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <img src="./logo_dreaming.png" className={styles.logoImg} />
            <div className={styles.reportTitleBox}>
                <p className={styles.reportTitle}>현재 드리밍에는</p>
                <p className={styles.reportTitle}>
                    <span className={styles.important_gray}>
                        총 {data?.allCount}개
                    </span>
                    의 글이 있어요!
                </p>
                <div className={styles.chart}>
                    <Pie data={chart} style={{ width: "80%", height: "80%" }} />
                </div>
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
                        <span className={styles.important_blue}>
                            {data?.allCount}
                        </span>
                        개의 글을 작성하셨네요
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
                        <span className={styles.important_blue}>
                            {data?.likeCount}
                        </span>
                        개 입니다!
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
                        <span className={styles.important_blue}>
                            {data?.commentCount}
                        </span>
                        개 입니다!
                    </p>
                </div>
                <img src="./report_comment.png" className={styles.iconImg} />
            </div>
        </div>
    );
}

export default ReportPage;
