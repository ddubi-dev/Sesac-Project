// 사용자 데이터 포멧 정의
export interface User {
  id: number;
  name: string;
  email: string;
}
// 내보내고 불러와서 사용

// 사용자 데이터 저장소 생성
export const users: User[] = [];
