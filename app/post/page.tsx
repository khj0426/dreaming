'use client';

import React, { useState, useEffect } from 'react';
import styles from './post.module.css';
import { postDiary } from '../api/service/diary';
import { usePathname, useRouter } from 'next/navigation';
import swal from 'sweetalert';

interface InputData {
  title: string;
  content: string;
  isShare: boolean;
  // date: string;
}

function PostPage() {
  const router = useRouter();
  const [today, setToday] = useState<string>();
  const [inputData, setInputData] = useState<InputData>({
    title: '',
    content: '',
    isShare: false,
    // date: today,
  });

  // input 데이터 갱신
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    const result = await swal({
      title: '저장하시겠습니까?',
      text: "저장을 원하면 '확인'을 누르세요.",
      icon: 'warning',
      dangerMode: true,
    });

    if (result) {
      let boolean_share = false;
      if (inputData.isShare) boolean_share = true;
      await postDiary(inputData.title, inputData.content, boolean_share);
      router.back();
    }
  };

  // 오늘 날짜로 설정하기
  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.postHeader}>
        <p className={styles.postHeaderTitle}>오늘의 꿈 일기</p>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          저장
        </button>
      </div>
      <form className={styles.postForm}>
        <div className={styles.postInfo}>
          {/* 입력 1 : 공개 범위 */}
          <select
            className={styles.postView}
            name="isShare"
            onChange={handleInputChange}
          >
            <option value={false.toString()}>나만보기</option>
            <option value={true.toString()}>전체보기</option>
          </select>

          {/* 입력 2 : 날짜 */}
          <p className={styles.postDate}>{today}</p>
        </div>

        <div className={styles.postBox}>
          {/* 입력 3 : 제목 */}
          <input
            type="text"
            placeholder="제목을 작성하세요"
            className={styles.postTitle}
            value={inputData.title}
            name="title"
            onChange={handleInputChange}
          ></input>

          {/* 입력 4 : 본문 */}
          <textarea
            placeholder="본문을 작성하세요"
            className={styles.postContent}
            value={inputData.content}
            name="content"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default PostPage;
