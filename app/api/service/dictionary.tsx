import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<dictionary 관련 api>
1. 꿈 해몽 불러오기
*/

// [post] 댓글 작성
export const getDictionary = async (category: string, page: number) => {
    try {
        // 요청 : category / comment
        const response = await axios({
            method: "GET",
            url: "/api/dictionary",
            params: {
                category: category,
                page: page,
            },
        });
        // 응답 결과 : dictionary[] / total
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
