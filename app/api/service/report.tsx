import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<드리밍 리포트 관련 api>
*/

// [get] 통계
export const getReport = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/report",
        });
        // 응답 결과 : allCount, sharedCount, notSharedCount, likeCount, commentCount
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
