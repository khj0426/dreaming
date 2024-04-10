"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Search.module.css";
import { useRouter } from "next/router";
import { getSearchDiary, getSearchDictionary } from "../../api/service/search";

interface SearchProps {
    onSearchKeyword: (keyword: string) => void;
}

const Search = ({ onSearchKeyword }: SearchProps) => {
    // 검색
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    // const router = useRouter();

    const handleInputKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        setInputKeyword(event.target.value);
    };

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchKeyword(inputKeyword);
        // console.log(inputKeyword);

        // 꿈 일기 검색
        // getSearchDiary(inputKeyword, 1);

        // 꿈 사전 검색
        // getSearchDictionary(inputKeyword, 1, 5);
        onSearchKeyword(inputKeyword);
    };

    return (
        <>
            <form onSubmit={search} className={styles.container}>
                <input
                    type="text"
                    placeholder="여기에 검색어를 입력하세요."
                    value={inputKeyword}
                    onChange={handleInputKeyword}
                    className={styles.searchBar}
                />
                <button type="submit" className={styles.submitBtn}>
                    검색
                </button>
            </form>
        </>
    );
};

export default Search;
