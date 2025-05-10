import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LatestNews.css";

const newsArticles = [
  {
    title: "Masters Bangkok: EYNTK",
    date: "February 11, 2025",
    description: "Find out the details of the first global event of the 2025 VCT Season!",
    detailedDescription: "The matches are set for the first global event of the 2025 VALORANT Champions Tour...",
    img: "valo news.jpg",
    newsURL: "https://valorantesports.com/en-US/news/masters-bangkok-eyntk-2025",
  },
  {
    title: "Fortnite Chapter 6 Season 2 First Info Revealed",
    date: "February 13, 2025",
    description: "Fortnite's next chapter has a release date, here is what fans can expect...",
    detailedDescription: "As expected, Fortnite Chapter 6 Season 2 will begin when the current season is complete...",
    img: "fortnite.jpg",
    newsURL: "https://thedirect.com/article/fortnite-chapter-6-season-2-first-info-revealed-release-theme",
  },
  {
    title: "Patch Notes 3.6 Update",
    date: "Feb 8, 2025",
    description: "Developers have announced a new patch with huge balance updates.",
    detailedDescription: "Hello BGMI fans! The long-awaited 3.6 Update is finally coming...",
    img: "bgmi news.jpg",
    newsURL: "https://www.battlegroundsmobileindia.com/news_view/873?n=202&t=203&c=",
  },
  {
    title: "CSGO News",
    date: "Feb 5, 2025",
    description: "Seasons greeting",
    detailedDescription: "Welcome to Premier Season Two. If you haven't heard the news...",
    img: "csgo news.jpg",
    newsURL: "https://www.counter-strike.net/newsentry/520830071182721028",
  },
];

const LatestNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % newsArticles.length);
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + newsArticles.length) % newsArticles.length);

  return (
    <div className="latest-news-container">
      <h2 className="news-title">Latest News</h2>
      <div className="carousel">
        <button className="prev-btn" onClick={prevSlide}>❮</button>
        <div className="news-slide" onClick={() => setSelectedNews(newsArticles[currentIndex])}>
          <img src={newsArticles[currentIndex].img} alt={newsArticles[currentIndex].title} className="news-img" />
          <div className="news-content">
            <h3 className="news-heading">{newsArticles[currentIndex].title}</h3>
            <p className="news-date">{newsArticles[currentIndex].date}</p>
            <p className="news-description">{newsArticles[currentIndex].description}</p>
          </div>
        </div>
        <button className="next-btn" onClick={nextSlide}>❯</button>
      </div>

      {selectedNews && (
        <div className="news-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedNews(null)}>✖</button>
            <img src={selectedNews.img} alt={selectedNews.title} className="modal-image" />
            <h2 className="news-heading">{selectedNews.title}</h2>
            <p className="news-date">{selectedNews.date}</p>
            <div className="news-description-scrollable">
              {selectedNews.detailedDescription}
            </div>
            <a href={selectedNews.newsURL} target="_blank" rel="noopener noreferrer" className="read-more">
              Read More →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
