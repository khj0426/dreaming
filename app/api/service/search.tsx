import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<search 관련 api>
1. 꿈 일기 검색
2. 꿈 해몽 검색
*/

// [get] 꿈 일기 검색
export const getSearchDiary = async (search: string, page: number) => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/diaries",
            params: {
                search: search,
                page: page,
            },
        });
        // 응답 결과 : 다이어리[]
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [get] 꿈 해몽 검색
export const getSearchDictionary = async (
    keyword: string,
    page: number,
    pageSize: number
) => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/dictionary/search`,
            params: {
                keyword: keyword,
                page: page,
                pageSize: pageSize,
            },
        });
        // 응답 결과 : 꿈 해몽[]
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
