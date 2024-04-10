import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<로또 관련 api>
1. 랜덤 숫자 7개 추천 받기
*/

// [get] 랜덤 로또 번호
export const getLotto = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/lotto",
        });
        // 응답 결과 : 로또 번호 7개
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
