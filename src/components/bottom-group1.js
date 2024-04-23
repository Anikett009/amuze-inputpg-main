import { useState } from 'react';
import styles from "./bottom-group.module.css";

const StarRating = ({ onRatingSelect }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    onRatingSelect(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          style={{
            color: value <= (hoverRating || rating) ? 'gold' : 'gray',
            cursor: 'pointer',
            fontSize: '5rem',
          }}
          onClick={() => handleStarClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const BottomGroup = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedbackModal(!showFeedbackModal);
  };

  const handleRatingSelect = (rating) => {
    console.log('Selected rating:', rating);
    setShowFeedbackModal(false);
  };

  return (
    <footer className={styles.bottomGroup}>
      
      <div className={styles.indeedx} />
      <div className={styles.bottomGroupInner}>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.optionsParent}>

              <button className={styles.privacy} onClick={handleFeedbackClick}>
                Privacy Policy
              </button>

              <button className={styles.contact} onClick={handleFeedbackClick}>
                Contact Us
              </button>


              <button className={styles.feedback} onClick={handleFeedbackClick}>
                Feedback
              </button>
            </div>
            {showFeedbackModal && (
              <div className={styles.starRatingContainer}>
                <StarRating onRatingSelect={handleRatingSelect} />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomGroup;