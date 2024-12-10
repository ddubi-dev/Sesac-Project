const axios = require("axios");
require("dotenv").config();

const username = "ddubi-dev";
// const url = `https://api.github.com/users/${username}/`;
const url = `https://api.github.com/users/${username}/repos`;

const token = process.env.GITHUB_TOKEN; // .env 파일 속.. 이건 github 에 안 올라감.

const fetchGithub = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`, // 인증 헤더 추가
      },
    });

    if (response.status === 200) {
      //   console.log("내 리포 정보: ", response.data);

      // 나의 리포 목록만 출력하기
      const repos = response.data;
      //   console.log(repos);
      //   repos.forEach((repo) => {
      //     console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count}`);
      //   });

      // 리포를 스타가 많은 순으로 소팅, 그 후 top5만 뽑아내기
      //   const topStarredRepo = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
      //   console.log("===스타수가 많은 리포 top5===");
      //   topStarredRepo.forEach((repo) => {
      //     console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count}`);
      //   });

      // 최근 한달 이내 업데이트가 이루어진 리포들 ??
      // 날짜 계산 Date 함수
      // repo.updated_at
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      console.log("한 달 전: ", oneMonthAgo);

      const recentlyUpdatedRepo = repos.filter((repo) => {
        const updatedAt = new Date(repo.updated_at);
        return updatedAt >= oneMonthAgo;
      });

      console.log("===최근 한 달 이내 업데이트된 리포===");
      recentlyUpdatedRepo.forEach((repo) => {
        // 한국 시간으로 변경
        const koreanTime = new Date(repo.updated_at).toLocalString("ko-KR", { timeZone: "Asia/Seoul" });
        console.log(`리포명: ${repo.name}, 업데이트된 날:${koreanTime}`);
        // console.log(`리포명: ${repo.name}, 업데이트된 날:${repo.updated_at}`);
      });

      //   repos.forEach((repo) => {
      //     console.log(repo.updated_at);
      //   });
    } else {
      console.log("오류: ", response.status);
    }
  } catch (error) {
    // 코드 죽었을 때 ...
    console.error("에러 발생: ", error.message);
  }
};

fetchGithub();

// axios.get(url).then((response) => {
//   console.log("내 리포 정보: ", response.data);
// });
// 에러처리 다 해야함.
// 안그러면 서버 멈춰서 완전 뻗어 버림.
