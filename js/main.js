/**
 * TechVanguard - Modern Web Interactions & Performance Logic
 * Pure Vanilla JavaScript (Zero external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderAndProgress();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  initBookmarks();
  initNewsFilter();
  initNewsletter();
  initPoll();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('techvanguard-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set default theme: stored theme or system preference, fallback to dark
  const currentTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('techvanguard-theme', newTheme);
      showToast(newTheme === 'dark' ? 'Đã bật chế độ Tối (Dark Mode)' : 'Đã bật chế độ Sáng (Light Mode)');
    });
  }
}

/* --------------------------------------------------------------------------
   2. Sticky Header & Reading Progress Bar
   -------------------------------------------------------------------------- */
function initHeaderAndProgress() {
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.reading-progress-bar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Toggle header background blur & shadow
        if (header) {
          if (scrollTop > 30) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        // Update reading progress bar
        if (progressBar && scrollHeight > 0) {
          const progressPct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
          progressBar.style.width = `${progressPct}%`;
        }

        // Toggle Back-To-Top button visibility
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (backToTopBtn) {
          if (scrollTop > 350) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close when clicking nav links
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   4. High Performance IntersectionObserver Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target); // Unobserve once animated for best performance
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   5. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. Toast Notification Helper
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.innerHTML = '<div class="toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(toastContainer);
  }

  const toast = toastContainer.querySelector('.toast');
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --------------------------------------------------------------------------
   7. Interactive Bookmarks
   -------------------------------------------------------------------------- */
function initBookmarks() {
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isSaved = btn.classList.toggle('saved');
      btn.setAttribute('aria-label', isSaved ? 'Bỏ lưu bài viết' : 'Lưu bài viết');
      showToast(isSaved ? 'Đã lưu bài viết vào mục yêu thích!' : 'Đã xóa bài viết khỏi mục yêu thích');
    });
  });
}

/* --------------------------------------------------------------------------
   8. News Filtering & Search System (news.html)
   -------------------------------------------------------------------------- */
function initNewsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const newsGrid = document.getElementById('newsArticleGrid');
  const searchInput = document.getElementById('newsSearchInput');
  const loadMoreBtn = document.getElementById('loadMoreNewsBtn');

  if (!newsGrid) return;

  const cards = newsGrid.querySelectorAll('.article-card');

  // Check URL query param e.g. ?cat=ai
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get('cat');
  if (paramCat) {
    const matchingTab = Array.from(filterTabs).find(t => t.getAttribute('data-category') === paramCat);
    if (matchingTab) {
      filterTabs.forEach(t => t.classList.remove('active'));
      matchingTab.classList.add('active');
    }
  }

  function applyFilters() {
    const activeTab = document.querySelector('.filter-tab.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let matchCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.article-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';

      const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = (!searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.classList.add('revealed');
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check empty state
    let emptyNotice = document.getElementById('emptyFilterNotice');
    if (matchCount === 0) {
      if (!emptyNotice) {
        emptyNotice = document.createElement('div');
        emptyNotice.id = 'emptyFilterNotice';
        emptyNotice.style.gridColumn = '1 / -1';
        emptyNotice.style.textAlign = 'center';
        emptyNotice.style.padding = '3.5rem 1rem';
        emptyNotice.innerHTML = `
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Không tìm thấy bài viết phù hợp</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển chuyên mục.</p>
        `;
        newsGrid.appendChild(emptyNotice);
      }
    } else if (emptyNotice) {
      emptyNotice.remove();
    }
  }

  // Filter tabs click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  // Debounced live search
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyFilters();
      }, 180);
    });
  }

  // Load More simulation
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        <span>Đang tải thêm...</span>
      `;
      setTimeout(() => {
        loadMoreBtn.innerHTML = `
          <span>Đã hiển thị tất cả bài viết hôm nay</span>
        `;
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.7';
        loadMoreBtn.style.cursor = 'default';
        showToast('Tất cả 12 bài viết phân tích mới nhất đã được tải đầy đủ!');
      }, 650);
    });
  }

  // Initial trigger to respect default or URL params
  applyFilters();
}

/* --------------------------------------------------------------------------
   9. Newsletter Subscription Handler
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim()) {
        const email = input.value.trim();
        showToast(`Đăng ký thành công! Bản tin công nghệ sẽ gửi tới: ${email}`);
        input.value = '';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Interactive Reader Poll
   -------------------------------------------------------------------------- */
function initPoll() {
  const pollOptions = document.querySelectorAll('.poll-option');
  let hasVoted = false;

  pollOptions.forEach(option => {
    option.addEventListener('click', () => {
      if (hasVoted) {
        showToast('Bạn đã bỏ phiếu trong cuộc thăm dò này!');
        return;
      }
      hasVoted = true;

      // Animate percentage bars
      pollOptions.forEach(opt => {
        const fill = opt.querySelector('.poll-fill');
        const targetPct = opt.getAttribute('data-pct') || '25';
        if (fill) {
          fill.style.width = `${targetPct}%`;
        }
      });

      option.style.borderColor = 'var(--color-cyan)';
      showToast('Cảm ơn bạn đã tham gia bình chọn!');
    });
  });
}
