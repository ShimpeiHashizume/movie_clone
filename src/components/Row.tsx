import React, { VFC, useState, useEffect } from "react";
import axios from "../axios";
import "./Row.scss";

const base_url = "https://image.tmdb.org/t/p/original";

// 親コンポーネントから受け取ったpropsの型
type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

// APIから受け取ったオブジェクトの型
type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const Row: VFC<Props> = (props) => {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          <img key={movie.id} className={`Row-poster ${isLargeRow && "Row-poster-large"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
        ))}
      </div>
    </div>
  );
};
