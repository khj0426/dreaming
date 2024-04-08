"use client";
import React, { useState, useEffect } from "react";
import styles from "../map/map.module.css";

const KakaoMap = () => {
    const [map, setMap] = useState<any>();

    useEffect(() => {
        // 카카오맵 script 준비
        const loadKakaoMapScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.onload = () => resolve(window.kakao);
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services`;
                document.head.appendChild(script);
            });
        };

        // 사용자 위치 주변 복권 판매점 찾기
        const searchLotteryStores = (map: any, center: any) => {
            const ps = new window.kakao.maps.services.Places();
            let currentInfowindow: { close: () => void } | null = null; // 현재 열린 인포윈도우 상태 확인

            // 키워드로 찾기 : 복권 판매점
            ps.keywordSearch(
                "복권 판매점",
                (data: string | any[], status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        for (let i = 0; i < data.length; i++) {
                            // 복권 판매점 마커 설정
                            const marker = new window.kakao.maps.Marker({
                                map: map,
                                position: new window.kakao.maps.LatLng(
                                    data[i].y,
                                    data[i].x
                                ),
                            });

                            // console.log(data[i]);

                            // 인포윈도우 : 상호명 / 주소 / 번호
                            const infowindow = new window.kakao.maps.InfoWindow(
                                {
                                    content: `<a href="https://map.kakao.com/link/map/${data[i].id}" target="_blank"><div class="info-window-content"><p class="info-window-title">${data[i].place_name}</p>${data[i].address_name}<br />${data[i].phone}</div></a>`,
                                }
                            );

                            // 마커에 'click' 이벤트 리스너 추가 : on off 가능하게
                            window.kakao.maps.event.addListener(
                                marker,
                                "click",
                                () => {
                                    // 이미 열린 인포윈도우가 있다면 닫는다.
                                    if (currentInfowindow) {
                                        currentInfowindow.close();
                                    }
                                    // 클릭한 마커의 인포윈도우가 이미 열려있는 상태라면 닫고, 그렇지 않다면 연다.
                                    if (currentInfowindow === infowindow) {
                                        currentInfowindow = null;
                                    } else {
                                        infowindow.open(map, marker);
                                        currentInfowindow = infowindow;
                                    }
                                }
                            );
                        }
                    } else {
                        alert("복권 판매점을 찾을 수 없습니다.");
                    }
                },
                {
                    location: center,
                }
            );
        };

        // 카카오맵 로드 및 초기화
        const initializeMap = async () => {
            try {
                await loadKakaoMapScript();

                window.kakao.maps.load(() => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            // 카카오맵 첫 시작 위치 : 사용자 위치를 중심으로 설정
                            const currentPos = new window.kakao.maps.LatLng(
                                pos.coords.latitude,
                                pos.coords.longitude
                            );

                            // 어디에 지도를 띄울건지, 그 확대 레벨은 몇인지
                            const mapContainer = document.getElementById("map");
                            const mapOption = {
                                center: currentPos,
                                level: 3,
                            };

                            const newMap = new window.kakao.maps.Map(
                                mapContainer,
                                mapOption
                            );
                            setMap(newMap);

                            // 사용자 위치는 다른 마커를 띄운다 (커스텀 마크 이미지 추가)
                            const imageSrc = "./map_customMarker.png";
                            // 마커 이미지의 크기
                            const imageSize = new window.kakao.maps.Size(
                                60,
                                60
                            );
                            // 마커 이미지의 옵션 (마커 위치)
                            const imageOption = {
                                offset: new window.kakao.maps.Point(27, 69),
                            };

                            // 마커 이미지 생성
                            const markerImage =
                                new window.kakao.maps.MarkerImage(
                                    imageSrc,
                                    imageSize,
                                    imageOption
                                );

                            // 내 위치를 나타내는 마커에 커스텀 마커 이미지 적용
                            new window.kakao.maps.Marker({
                                map: newMap,
                                position: currentPos,
                                image: markerImage,
                            });

                            // 주변 복권 판매점 검색 및 마커 표시
                            searchLotteryStores(newMap, currentPos);
                        },
                        () => alert("위치 정보를 가져오는데 실패했습니다.")
                    );
                });
            } catch (error) {
                console.error("Failed to load Kakao Map:", error);
            }
        };

        // 지도 초기화
        initializeMap();
    }, []);

    // 카카오맵은 width+height가 설정되어 있어야 정상 작동
    return <div id="map" className={styles.map}></div>;
};

export default KakaoMap;
