class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('pointermove', (e) => {
      e.preventDefault();

      if (!this.rotating) {
        this.touchMoveX = e.clientX;
        this.touchMoveY = e.clientY;

        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;

        if (this.holdingPaper) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          const maxX = window.innerWidth - paper.clientWidth;
          const maxY = window.innerHeight - paper.clientHeight;

          this.currentPaperX = Math.max(0, Math.min(this.currentPaperX, maxX));
          this.currentPaperY = Math.max(0, Math.min(this.currentPaperY, maxY));

          // Gunakan requestAnimationFrame untuk animasi yang lebih mulus
          requestAnimationFrame(() => {
            paper.style.transform = `translate3d(${this.currentPaperX}px, ${this.currentPaperY}px, 0) rotateZ(${this.rotation}deg)`;
          });
        }
      }

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;
    });

    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = "999"; // Menaikkan zIndex agar lebih tinggi
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('pointerup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });

    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
