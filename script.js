class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('pointermove', (e) => {
      e.preventDefault();

      if (this.holdingPaper) {
        this.touchMoveX = e.clientX;
        this.touchMoveY = e.clientY;

        const deltaX = this.touchMoveX - this.touchStartX;
        const deltaY = this.touchMoveY - this.touchStartY;

        this.currentPaperX += deltaX;
        this.currentPaperY += deltaY;

        const maxX = window.innerWidth - paper.clientWidth;
        const maxY = window.innerHeight - paper.clientHeight;

        this.currentPaperX = Math.max(0, Math.min(this.currentPaperX, maxX));
        this.currentPaperY = Math.max(0, Math.min(this.currentPaperY, maxY));

        this.touchStartX = this.touchMoveX;
        this.touchStartY = this.touchMoveY;

        // Gunakan requestAnimationFrame untuk animasi yang lebih mulus
        requestAnimationFrame(() => {
          paper.style.transform = `translate3d(${this.currentPaperX}px, ${this.currentPaperY}px, 0) rotateZ(${this.rotation}deg)`;
        });
      }
    });

    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = "999"; // Menaikkan zIndex agar lebih tinggi
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
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
 
