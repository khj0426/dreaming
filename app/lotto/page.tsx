"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./lotto.module.css";
import { GrMoney } from "react-icons/gr";
import { UserProps } from "../diary/page";
import { getUser } from "../api/service/user";
import { getLotto } from "../api/service/lotto";

function LottoPage() {
    const [user, setUser] = useState<UserProps[]>([]);
    const [lotto, setLotto] = useState<number[]>();

    // 애니메이션 활성화 상태
    const [isAnimating, setIsAnimating] = useState(false);

    // 버튼 클릭 이벤트 핸들러
    const handlePlayButtonClick = useCallback(() => {
        const isConfirmed = window.confirm(
            "300 포인트를 사용하여 로또 번호를 추천 받으시겠습니까?"
        );

        if (isConfirmed) {
            setIsAnimating(true);

            // [api] 랜덤 로또 번호 get (애니메이션으로 살짝 딜레이)
            setTimeout(() => {
                (async () => {
                    try {
                        const data = await getLotto();
                        setLotto(data);
                        console.log(data);
                    } catch (error) {
                        console.error(
                            "로또 추천 번호를 불러오는 데 실패했습니다.",
                            error
                        );
                    }
                })();
            }, 2500);

            // 3초 후 다시 false
            setTimeout(() => {
                setIsAnimating(false);
            }, 3000);
        }
    }, []);

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
        // 포인트 차감 후 리렌더링
    }, [lotto]);

    // 로또 번호 7개 추천
    const generateLottoNumbers = () => {
        const numbers = new Set<number>();
        while (numbers.size < 7) {
            const number = Math.floor(Math.random() * 45) + 1; // 1부터 45까지의 랜덤 숫자
            numbers.add(number);
        }
        return Array.from(numbers);
    };

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
                <p className={styles.username}>{user.name} 님</p>
                <p className={styles.point}>
                    <GrMoney /> <p>{user.point} p</p>
                </p>
            </div>

            <div
                className={`${styles.lottos} ${
                    isAnimating ? styles.animate : ""
                }`}
            >
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[0] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[1] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[2] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[3] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[4] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[5] : "?"}</p>
                </div>
                <div className={styles.lotto}>
                    <p className={styles.lottoNum}>{lotto ? lotto[6] : "?"}</p>
                </div>
            </div>

            <div className={styles.playBtn} onClick={handlePlayButtonClick}>
                추첨하기
            </div>
        </div>
    );
}

export default LottoPage;
