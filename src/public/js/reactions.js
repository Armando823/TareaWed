// Enhanced reaction system with animations and feedback
function updateCounter(button, selector, increment = 1) {
  const parent = button.closest('.card-body');
  const counter = parent.querySelector(selector);
  if (!counter) return;

  let count = Number(counter.dataset.count || counter.textContent || '0');
  count += increment;
  counter.dataset.count = count;
  counter.textContent = count;

  // Add animation effect
  counter.classList.add('counter-update');
  setTimeout(() => counter.classList.remove('counter-update'), 300);
}

function animateButton(button) {
  button.classList.add('btn-clicked');
  setTimeout(() => button.classList.remove('btn-clicked'), 200);
}

function showReactionFeedback(button, reactionType) {
  const feedback = document.createElement('div');
  feedback.className = 'reaction-feedback';
  feedback.textContent = reactionType === 'like' ? '👍' : reactionType === 'comment' ? '💬' : '🔗';
  feedback.style.cssText = `
    position: absolute;
    font-size: 24px;
    pointer-events: none;
    z-index: 1000;
    animation: floatUp 1s ease-out forwards;
  `;

  const rect = button.getBoundingClientRect();
  feedback.style.left = rect.left + rect.width / 2 - 12 + 'px';
  feedback.style.top = rect.top - 10 + 'px';

  document.body.appendChild(feedback);

  setTimeout(() => {
    if (feedback.parentElement) {
      feedback.remove();
    }
  }, 1000);
}

function handleReactionButton(event) {
  const button = event.target.closest('.btn-like, .btn-comment, .btn-share');
  if (!button) return;

  // Prevent double-clicks
  if (button.disabled) return;
  button.disabled = true;
  setTimeout(() => button.disabled = false, 500);

  animateButton(button);

  if (button.classList.contains('btn-like')) {
    updateCounter(button, '.like-count');
    showReactionFeedback(button, 'like');
  } else if (button.classList.contains('btn-comment')) {
    updateCounter(button, '.comment-count');
    showReactionFeedback(button, 'comment');
  } else if (button.classList.contains('btn-share')) {
    updateCounter(button, '.share-count');
    showReactionFeedback(button, 'share');

    // Special animation for share
    const albumCard = button.closest('.album-card') || button.closest('.card');
    if (albumCard) {
      albumCard.classList.add('share-animation');
      setTimeout(() => albumCard.classList.remove('share-animation'), 1000);
    }
  }
}

// Add CSS animations dynamically
function addReactionStyles() {
  if (document.getElementById('reaction-styles')) return;

  const style = document.createElement('style');
  style.id = 'reaction-styles';
  style.textContent = `
    .btn-clicked {
      transform: scale(0.95);
      transition: transform 0.1s ease;
    }

    .counter-update {
      color: #1877f2 !important;
      font-weight: bold;
      animation: pulse 0.3s ease;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    @keyframes floatUp {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-50px) scale(1.5);
      }
    }

    .share-animation {
      animation: sharePulse 0.6s ease;
      border: 2px solid #1877f2 !important;
    }

    @keyframes sharePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(24, 119, 242, 0.3); }
      100% { transform: scale(1); }
    }

    .reaction-feedback {
      user-select: none;
    }
  `;
  document.head.appendChild(style);
}

// Initialize reaction system
document.addEventListener('DOMContentLoaded', function() {
  addReactionStyles();

  // Add hover effects for reaction buttons
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.btn-like, .btn-comment, .btn-share')) {
      const button = e.target.closest('.btn-like, .btn-comment, .btn-share');
      button.style.transform = 'translateY(-1px)';
    }
  });

  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.btn-like, .btn-comment, .btn-share')) {
      const button = e.target.closest('.btn-like, .btn-comment, .btn-share');
      button.style.transform = 'translateY(0)';
    }
  });
});

document.addEventListener('click', handleReactionButton);
