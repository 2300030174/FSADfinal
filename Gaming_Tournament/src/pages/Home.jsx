import { motion } from "framer-motion";
import Cards from "../components/Cards.jsx";
import Live from "./Live.jsx";
import LatestNews from "./LatestNews.jsx";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import "./Home.css";
import GamingGear from "./GamingGear.jsx";
import { getAllGamingGear } from "./gearData.jsx"; // Import all gear items

export default function Home({ tournaments }) {
  const allGearItems = getAllGamingGear(); // Get full gear list
  const limitedGearItems = allGearItems.slice(0, 4); // Only take 4 items

  return (
    <div className="home-container">

      {/* Tournaments Section - FIRST */}
      <motion.section
        className="section tournaments-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">🔥 Featured Tournaments</h2>
        <Cards games={tournaments.slice(0, 4)} />
      </motion.section>

      {/* Gaming Gear Section - SECOND */}
      <motion.section
        className="section gear-section"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">🎮 Gaming Gear</h2>
        <div className="gear-cards-container">
          {limitedGearItems.map((gear, index) => (
            <motion.div
              className="gear-card"
              key={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="gear-card-content">
                <img src={gear.img} alt={gear.name} className="gear-image" />
                <div className="gear-info">
                  <h3>{gear.name}</h3>
                  <p>{gear.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Latest News Section - THIRD */}
      <motion.section
        className="section news-section"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">📰 Latest News</h2>
        <LatestNews />
      </motion.section>

      {/* Live Section - FOURTH */}
      <motion.section
        className="section live-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">🎥 Live Streams</h2>
        <Live />
      </motion.section>

      {/* Footer Section */}
      <footer className="footer">
        <motion.div
          className="footer-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="footer-content">
            <div className="footer-left">
              <img src="./public/footer.jpg" alt="Footer Banner" className="footer-image" />
            </div>
            <div className="footer-right">
              <h3>🙏 Thank You for Visiting!</h3>
              <p>Follow us on social media for the latest updates.</p>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={30} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>

    </div>
  );
}
