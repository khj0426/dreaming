'use client';

import React, { useEffect, useState } from 'react';
import styles from './community.module.css';
import HallOfFame from '../components/HallOfFame/HallOfFame';
import BasicPagination from '../components/BasicPagination';
import Diary, { DiaryProps } from '../components/Diary/Diary';
import Search from '../components/Search/Search';
import { useAxios } from '../hooks/useAxios';
import { useRouter } from 'next/router';
import { getSearchDiary } from '../api/service/search';
export interface Data {
  total: number;
  diaries: DiaryType[];
}
interface Like {
  id: string;
  memberId: string;
  diaryId: string;
}

export interface DiaryType {
  id: string;
  title: string;
  likes: number;
  updated_At: string;
  isShare: boolean;
  contents: string;
  like: Like[];
  writerName: string;
  writerId: number;
  writerPicture: string;
}

function CommunityPage() {
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 데이터 수
  const [data, setData] = useState<Data | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 자식에게 받을 검색어

  // 페이지 업데이트
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
  };

  // 검색바 -> 검색어 업데이트
  const handleSearchKeyword = (result: string) => {
    setSearchKeyword(result);
    console.log(result);
  };

  // [api] 꿈 일기 목록 get 요청
  useEffect(() => {
    (async () => {
      try {
        const data = await getSearchDiary(searchKeyword, page);
        setData(data);
        console.log(data.diaries);
      } catch (error) {
        console.error('다이어리 목록을 불러오는 데 실패했습니다.', error);
      }
    })();
  }, [page, searchKeyword]); // 페이지 번호가 변경될 때마다 리렌더링

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.hallOfFameBox}>
        <HallOfFame />
      </div>
      <div className={styles.searchBox}>
        <p className={styles.searchTitle}>꿈 게시글 검색</p>
        <Search onSearchKeyword={handleSearchKeyword} />
      </div>
      <div className={styles.posts}>
        {data?.diaries && data.diaries.length > 0 ? (
          data.diaries.map((d) => (
            <Diary
              key={d.id}
              id={d.id}
              title={d.title}
              isShare={d.isShare}
              contents={d.contents}
              like={d.likes ?? 0}
              writerId={d.writerId}
              writerName={d.writerName}
              writerImage={d.writerPicture}
              updated_At={d.updated_At}
            />
          ))
        ) : (
          <p className={styles.nothing}>등록된 일기가 없습니다.</p>
        )}
      </div>
      <div className={styles.pagination}>
        <BasicPagination
          count={Math.ceil((data?.total as number) / 15)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default CommunityPage;
