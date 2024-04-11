"use client";

import React, { useEffect, useState } from "react";
import styles from "./dictionary.module.css";
import Search from "../components/Search/Search";
import BasicPagination from "../components/BasicPagination";
import page from "../page";
import Dream from "../components/Dream/Dream";
import { getSearchDictionary } from "../api/service/search";
import { getDictionary } from "../api/service/dictionary";

function DiaryPage() {
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 총 데이터 수
    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState<string>(""); // 자식에게 받을 검색어
    const [category, setCategory] = useState<string | undefined>(""); // 카테고리 선택

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    };

    // 검색바 -> 검색어 업데이트
    const handleSearchKeyword = (result: string) => {
        setSearchKeyword(result);
        setPage(1);
        console.log(result);
    };

    // 카테고리 선택
    const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        setCategory(target.dataset.key);
    };

    // [api] 꿈 해몽 카테고리별 조회
    useEffect(() => {
        (async () => {
            try {
                if (category !== undefined) {
                    const data = await getDictionary(category, page);
                    setData(data);
                    console.log(data);
                }
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, [page, category]); // 페이지 번호가 변경될 때마다 리렌더링

    // [api] 꿈 일기 목록 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getSearchDictionary(searchKeyword, page, 10);
                setData(data);
                console.log(data);
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, [page, searchKeyword]); // 페이지 번호가 변경될 때마다 리렌더링

    return (
        <div className={styles.container}>
            <div className={styles.dictionaryHeaderBox}>
                <div className={styles.dictionaryHeader}>
                    <p className={styles.dictionaryTitle}>꿈 해몽 사전</p>
                    <Search onSearchKeyword={handleSearchKeyword} />
                    <div
                        className={styles.categories}
                        onClick={handleCategoryClick}
                    >
                        <p className={styles.category} data-key="자연">
                            자연
                        </p>
                        <p className={styles.category} data-key="인물">
                            인물
                        </p>
                        <p className={styles.category} data-key="식물">
                            식물
                        </p>
                        <p className={styles.category} data-key="동물">
                            동물
                        </p>
                        <p className={styles.category} data-key="신체">
                            신체
                        </p>
                        <p className={styles.category} data-key="물건">
                            물건
                        </p>
                        <p className={styles.category} data-key="장소">
                            장소
                        </p>
                        <p className={styles.category} data-key="행동">
                            행동
                        </p>
                        <p className={styles.category} data-key="기타">
                            기타
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.dreams}>
                {data?.dictionaries && data.dictionaries.length > 0 ? (
                    data.dictionaries.map((d) => (
                        <Dream
                            key={d.id}
                            id={d.id}
                            category={d.category}
                            title={d.title}
                            contents={d.contents}
                        />
                    ))
                ) : (
                    <p className={styles.nothing}>등록된 꿈 해몽이 없습니다.</p>
                )}
            </div>

            {/* 페이지네이션 */}
            <div className={styles.pagination}>
                <BasicPagination
                    count={Math.ceil(data?.total / 10)}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
}

export default DiaryPage;
