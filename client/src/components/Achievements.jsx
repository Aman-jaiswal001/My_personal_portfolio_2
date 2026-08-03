import { useEffect, useState } from 'react';
import { mediaUrl } from '../utils/media.js';

function AchievementCard({ achievement, onOpen }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = achievement.images;

  useEffect(() => {
    if (images.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setActiveImage((index) => (index + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <button className="achievement-card" type="button" onClick={() => onOpen(achievement)}>
      <div className="achievement-slider">
        {images.map((image, index) => (
          <img
            className={index === activeImage ? 'active' : ''}
            src={mediaUrl(image)}
            alt={`${achievement.title} image ${index + 1}`}
            key={image}
          />
        ))}
        {images.length > 1 ? <span>{images.length} Images</span> : null}
      </div>
      <div className="achievement-content">
        <span>{achievement.issuer}</span>
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
      </div>
    </button>
  );
}

function CertificateModal({ achievement, activeIndex, onChange, onClose }) {
  useEffect(() => {
    if (!achievement) return undefined;

    document.body.classList.add('modal-open');
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [achievement, onClose]);

  if (!achievement) return null;

  const images = achievement.images;
  const activeImage = images[activeIndex];
  const activeImageUrl = mediaUrl(activeImage);
  const downloadName = `${achievement.title.replaceAll(' ', '-').toLowerCase()}-${activeIndex + 1}.jpeg`;
  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="certificate-modal active"
      aria-hidden="false"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="certificate-detail" role="dialog" aria-modal="true" aria-labelledby="certificateTitle">
        <button className="certificate-close" type="button" aria-label="Close certificate details" onClick={onClose}>
          <i className="bx bx-x" />
        </button>
        <div className="certificate-gallery">
          <button
            className="certificate-nav certificate-prev"
            type="button"
            aria-label="Previous certificate image"
            hidden={!hasMultipleImages}
            onClick={() => onChange(activeIndex - 1)}
          >
            <i className="bx bx-chevron-left" />
          </button>
          <img src={activeImageUrl} alt={`${achievement.title} image ${activeIndex + 1}`} />
          <button
            className="certificate-nav certificate-next"
            type="button"
            aria-label="Next certificate image"
            hidden={!hasMultipleImages}
            onClick={() => onChange(activeIndex + 1)}
          >
            <i className="bx bx-chevron-right" />
          </button>
        </div>
        <div className="certificate-info">
          <p>{achievement.issuer}</p>
          <h3 id="certificateTitle">{achievement.title}</h3>
          <p>{achievement.description}</p>
          <div className="certificate-thumbnails" hidden={!hasMultipleImages} aria-label="Related achievement images">
            {images.map((image, index) => (
              <button
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => onChange(index)}
                key={image}
              >
                <img src={mediaUrl(image)} alt={`${achievement.title} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
          <a className="certificate-download" href={activeImageUrl} download={downloadName}>
            <i className="bx bx-download" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Achievements({ isVisible, savedAchievements = [] }) {
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const allAchievements = [...savedAchievements];

  const openCertificate = (achievement) => {
    setActiveAchievement(achievement);
    setActiveIndex(0);
  };

  const changeImage = (index) => {
    if (!activeAchievement) return;
    setActiveIndex((index + activeAchievement.images.length) % activeAchievement.images.length);
  };

  return (
    <>
      <section className={`achievements ${isVisible ? 'show-animate' : ''}`} id="achievements">
        <h2 className="heading">
          My <span>Achievements</span>
          <span className="animate scroll" style={{ '--i': 1 }} />
        </h2>

        <div className="achievements-container">
          {allAchievements.length ? allAchievements.map((achievement) => (
            <AchievementCard achievement={achievement} onOpen={openCertificate} key={achievement._id || `${achievement.issuer}-${achievement.title}-${achievement.images[0]}`} />
          )) : <p className="empty-state">No achievements uploaded yet.</p>}
        </div>
      </section>

      <CertificateModal
        achievement={activeAchievement}
        activeIndex={activeIndex}
        onChange={changeImage}
        onClose={() => setActiveAchievement(null)}
      />
    </>
  );
}
