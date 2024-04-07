"use client";

import React, { useCallback, useState } from "react";
import styles from "./lotto.module.css";
import { GrMoney } from "react-icons/gr";

function LottoPage() {
    // 애니메이션 활성화 상태
    const [isAnimating, setIsAnimating] = useState(false);

    // 버튼 클릭 이벤트 핸들러
    const handlePlayButtonClick = useCallback(() => {
        setIsAnimating(true);

        // 3초 후 다시 false
        setTimeout(() => {
            setIsAnimating(false);
        }, 3000);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.lottoHeaderBox}>
                <p className={styles.lottoTitle}>로또 번호 추천</p>
                <p className={styles.lottoSubtitle}>
                    꿈 일기로 포인트를 모아 로또 번호를 추천 받아보세요.
                    <br />
                    분명 좋은 일이 생길거예요! (1회 : 100 포인트)
                </p>
            </div>

            <div className={styles.userBox}>
                <p className={styles.username}>user-101010 님</p>
                <p className={styles.point}>
                    <GrMoney /> <p>1000 p</p>
                </p>
            </div>

            <div
                className={`${styles.lottos} ${
                    isAnimating ? styles.animate : ""
                }`}
            >
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>1</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>2</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>3</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>4</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>5</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>6</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>7</p>
                </div>
            </div>

            <div className={styles.playBtn} onClick={handlePlayButtonClick}>
                추첨하기
            </div>
        </div>
    );
}

export default LottoPage;
