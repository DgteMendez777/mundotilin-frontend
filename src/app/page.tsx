"use client";

import { useState } from "react";

const hearts = [
  { left: "8%", top: "80%", delay: "0s", size: "18px" },
  { left: "18%", top: "35%", delay: "0.4s", size: "24px" },
  { left: "28%", top: "70%", delay: "0.8s", size: "16px" },
  { left: "40%", top: "20%", delay: "1.2s", size: "26px" },
  { left: "52%", top: "85%", delay: "1.6s", size: "20px" },
  { left: "65%", top: "40%", delay: "2s", size: "28px" },
  { left: "78%", top: "72%", delay: "2.4s", size: "17px" },
  { left: "90%", top: "28%", delay: "2.8s", size: "25px" },
  { left: "12%", top: "12%", delay: "3.2s", size: "19px" },
  { left: "85%", top: "88%", delay: "3.6s", size: "22px" },
  { left: "48%", top: "55%", delay: "4s", size: "15px" },
  { left: "72%", top: "10%", delay: "4.4s", size: "27px" },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="love-page">
      <div className="bg-glow" />

      {hearts.map((heart, i) => (
        <span
          key={i}
          className="heart"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}

      <section className={`intro ${open ? "hidden-intro" : ""}`}>
        <div className="star">⭐</div>

        <h1>Tengo algo para ti</h1>

        <p className="subtitle">
          Una cartita pequeña, pero hecha con todo mi corazón.
        </p>

        <button className="envelope-button" onClick={() => setOpen(true)}>
          <span className="envelope">💌</span>
          <span className="open-text">Ábreme con amor</span>
        </button>
      </section>

      <section className={`letter-screen ${open ? "show-letter" : ""}`}>
        <div className="love-card">
          <div className="card-heart">💖</div>

          <h2>Te amo mucho</h2>

          <p>
            Quería recordarte que eres una persona demasiado especial para mí.
            Me haces feliz, me haces sonreír y me encanta tenerte en mi vida.
          </p>

          <div className="message-box">
            Eres mi alegría amor, eres mi estrellita y no me cansare de decirlo "Te amo mucho". ✨
          </div>

          <div className="icons">💕 🌙 ⭐</div>

          <button className="close-love" onClick={() => setOpen(false)}>
            Volver a abrir la cartita Si me amas mucho💌
          </button>
        </div>
      </section>

      <style jsx>{`
        .love-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: linear-gradient(180deg, #160018, #2b0638, #07010c);
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }

        .bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top, rgba(255, 122, 217, 0.35), transparent 35%),
            radial-gradient(circle at bottom, rgba(255, 47, 125, 0.3), transparent 45%);
        }

        .heart {
          position: absolute;
          z-index: 2;
          color: rgba(255, 190, 220, 0.7);
          animation: float 5s linear infinite;
          text-shadow: 0 0 16px rgba(255, 120, 180, 0.8);
        }

        .intro {
          position: relative;
          z-index: 5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .hidden-intro {
          opacity: 0;
          transform: scale(0.9);
          pointer-events: none;
        }

        .star {
          font-size: 96px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 35px #ffd56b);
          animation: starDrop 1.2s ease-out;
        }

        h1 {
          font-size: 38px;
          line-height: 1.1;
          font-weight: 900;
          margin: 0 0 14px;
        }

        .subtitle {
          max-width: 320px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.82);
          margin-bottom: 70px;
        }

        .envelope-button {
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: linear-gradient(145deg, #ff8ab3, #ff3d78, #b5164b);
          border-radius: 32px;
          width: 260px;
          padding: 28px 20px;
          cursor: pointer;
          box-shadow: 0 25px 60px rgba(255, 55, 130, 0.35);
          animation: riseUp 1.2s ease-out;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .envelope-button:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 35px 80px rgba(255, 55, 130, 0.55);
        }

        .envelope-button:active {
          transform: scale(0.96);
        }

        .envelope {
          display: block;
          font-size: 76px;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 20px white);
        }

        .open-text {
          display: inline-block;
          background: white;
          color: #be123c;
          font-weight: 900;
          font-size: 15px;
          padding: 10px 18px;
          border-radius: 999px;
        }

        .letter-screen {
          position: absolute;
          inset: 0;
          z-index: 20;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #050006;
          opacity: 0;
          pointer-events: none;
          transform: scale(1.05);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .show-letter {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }

        .love-card {
          width: 100%;
          max-width: 370px;
          background: linear-gradient(145deg, #fff7fb, #ffd6e7, #ffb3cf);
          color: #881337;
          border-radius: 34px;
          padding: 36px 26px 28px;
          text-align: center;
          box-shadow: 0 30px 90px rgba(255, 77, 136, 0.5);
          animation: cardOpen 0.45s ease-out;
        }

        .card-heart {
          font-size: 62px;
          margin-bottom: 8px;
        }

        .love-card h2 {
          font-size: 32px;
          font-weight: 900;
          color: #e11d48;
          margin: 0 0 18px;
        }

        .love-card p {
          font-size: 15px;
          line-height: 1.75;
          margin: 0;
        }

        .message-box {
          margin-top: 22px;
          background: rgba(255, 255, 255, 0.75);
          border-radius: 22px;
          padding: 16px;
          font-weight: 800;
          font-size: 14px;
        }

        .icons {
          margin-top: 20px;
          font-size: 30px;
        }

        .close-love {
          margin-top: 24px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #e11d48, #be123c);
          color: white;
          padding: 14px 22px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(225, 29, 72, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .close-love:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(225, 29, 72, 0.6);
        }

        @keyframes starDrop {
          from {
            transform: translateY(-180px) scale(0.4);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes riseUp {
          from {
            transform: translateY(180px) scale(0.85);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes cardOpen {
          from {
            transform: scale(0.85) translateY(30px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-120px) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}