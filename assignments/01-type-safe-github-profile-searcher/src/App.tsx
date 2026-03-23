import { useState } from "react";
import "./App.css";
import type { GithubUser } from "./types/github";
import { fetchGithubUser } from "./api/github";

function App() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const query = search.trim();
    // 검색어 없는 경우
    if (!query) {
      setError("userName을 입력해주세요.");
      setUserData(null);
      return;
    }

    // 로딩 시작
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGithubUser(query);
      setUserData(data);
    } catch (e) {
      setUserData(null);
      // catch의 e는 기본적으로 unknown이기에 곧바로
      // e.message에 접근할 수 없음.
      // instanceof Error는 e가 진짜 Error 객체인지 확인하는 타입가드
      // instanceof Error 체크를 통과하면 TS가 e를 Error로 좁혀줌.
      // 그 다음 e.message === "NOT_FOUND" 비교가 안전하게 가능.
      if (e instanceof Error && e.message === "NOT_FOUND") {
        setError("사용자를 찾을 수 없습니다.");
      } else {
        setError("네트워크 또는 서버 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1>깃허브 팔로우/팔로잉 수 찾기</h1>
        <div className="flex gap-10">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="github 아이디를 입력해주세요"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        {isLoading && <p>불러오는 중...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && userData && (
          <section>
            <img src={userData?.avatar_url} />
            <div>팔로우 수 : {userData?.followers}</div>
            <div>팔로잉 수 : {userData?.following}</div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
