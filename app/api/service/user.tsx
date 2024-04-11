import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<유저 관련 api>
1. 모든 유저 정보 get
2. 로그인한 유저 정보 get
*/

// [get] 유저 정보 get
export const getUser = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/user`,
        });
        // 응답 결과 : id / name / nickname / picture / point
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
