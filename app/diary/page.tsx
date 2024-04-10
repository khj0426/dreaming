"use client";

import React, { useEffect, useState } from "react";
import styles from "./diary.module.css";
import LinkToDiary from "../components/LinkToDiary/LinkToDiary";
import Pagination from "@mui/material/Pagination";

import { Data } from "../community/page";
import { GrMoney } from "react-icons/gr";
import LinkToReport from "../components/LinkToReport/LinkToReport";
import Diary, { DiaryProps } from "../components/Diary/Diary";
import BasicPagination from "../components/BasicPagination";
import { useAxios } from "../hooks/useAxios";
import { getDiaryList } from "../api/service/diary";
import { getUser } from "../api/service/user";

export interface UserProps {
    id: string;
    name: string;
    nickname: string | null;
    picture: string | null | undefined;
    point: number;
}

function DiaryPage() {
    const [page, setPage] = useState(1); // 현재 페이지
    const [data, setData] = useState<Data | null>(null);
    const [user, setUser] = useState<UserProps[]>([]);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    };

    // [api] 꿈 일기 목록 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getDiaryList(page, 5);
                setData(data);
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, [page]); // 페이지 번호가 변경될 때마다 리렌더링

    // [api] 로그인한 유저 정보 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getUser();
                setUser(data.user);
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headBox}>
                <div className={styles.userBox}>
                    <p className={styles.hello}>반가워요!</p>
                    <div className={styles.user}>
                        <p className={styles.username}>{user.name} 님</p>
                        <p className={styles.point}>
                            <GrMoney /> <p>{user.point} p</p>
                        </p>
                    </div>
                </div>
                <div className={styles.widgets}>
                    <LinkToDiary />
                    <LinkToReport />
                </div>
            </div>

            <div className={styles.postBox}>
                <p className={styles.postsTitle}>꿈 일기 목록</p>
                {data?.diaries && data.diaries.length > 0 ? (
                    data?.diaries.map((d) => (
                        <Diary
                            key={d.id}
                            id={d.id}
                            title={d.title}
                            isShare={d.isShare}
                            contents={d.contents}
                            like={d?.like?.length}
                            writerId={d.writerId}
                            updated_At={d.updated_At}
                            writerName={d.writerName}
                            writerImage={d.writerPicture}
                        />
                    ))
                ) : (
                    <p className={styles.nothing}>등록된 일기가 없습니다.</p>
                )}

                {/* 페이지네이션 */}
                <div className={styles.pagination}>
                    <BasicPagination
                        count={Math.ceil((data?.total as number) / 5)}
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiaryPage;
