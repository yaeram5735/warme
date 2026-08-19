document.addEventListener(
  "DOMContentLoaded",
  () => {

    const header =
      document.querySelector(
        ".site-header"
      );


    if (!header) {
      return;
    }


    const menuButton =
      header.querySelector(
        ".header-menu"
      );


    const navLinks =
      document.querySelectorAll(
        ".header-nav__link"
      );


    const mobileLinks =
      document.querySelectorAll(
        ".mobile-menu__nav a"
      );


    /* ==============================
       HEADER SCROLL
    ============================== */

    function headerScroll() {

      if (
        window.scrollY > 30
      ) {

        header.classList.add(
          "is-scrolled"
        );

      }

      else {

        header.classList.remove(
          "is-scrolled"
        );

      }

    }


    window.addEventListener(
      "scroll",
      headerScroll,
      {
        passive: true
      }
    );


    headerScroll();



    /* ==============================
       MOBILE MENU
    ============================== */

    menuButton?.addEventListener(
      "click",
      () => {

        const isOpen =
          header.classList.toggle(
            "menu-open"
          );


        menuButton.classList.toggle(
          "is-open",
          isOpen
        );


        menuButton.setAttribute(
          "aria-expanded",
          isOpen
        );

      }
    );



    /* ==============================
       SMOOTH SCROLL
    ============================== */

    const allLinks =
      [
        ...navLinks,
        ...mobileLinks
      ];


    allLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );


            if (
              !targetId ||
              !targetId.startsWith("#")
            ) {
              return;
            }


            const target =
              document.querySelector(
                targetId
              );


            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });


            /* 모바일 메뉴 닫기 */

            header.classList.remove(
              "menu-open"
            );


            menuButton?.classList.remove(
              "is-open"
            );


            menuButton?.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );



    /* ==============================
       ACTIVE SECTION
    ============================== */

    const sections =
      document.querySelectorAll(
        "#stay, #program, #film, #shop, #about"
      );


    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              const id =
                entry.target.id;


              navLinks.forEach(
                (link) => {

                  link.classList.toggle(
                    "is-active",
                    link.getAttribute(
                      "href"
                    ) === `#${id}`
                  );

                }
              );

            }
          );

        },

        {
          rootMargin:
            "-35% 0px -55% 0px",

          threshold: 0
        }

      );


    sections.forEach(
      (section) => {

        observer.observe(
          section
        );

      }
    );

  }
);


document.addEventListener("DOMContentLoaded", () => {

  const dots =
    document.querySelectorAll(".stay-dot");


  /* ==============================
     Pagination
  ============================== */

  dots.forEach((dot) => {

    dot.addEventListener("click", () => {

      dots.forEach((item) => {
        item.classList.remove("active");
      });

      dot.classList.add("active");


      /*
       실제 Swiper를 쓰는 경우에는
       아래 index를 swiper.slideTo(index)
       로 연결하면 됩니다.
      */

      const index =
        Number(dot.dataset.slide);

      console.log(
        "slide index:",
        index
      );

    });

  });



  /* ==============================
     Character floating
  ============================== */

  const characters =
    document.querySelectorAll(
      ".stay-character img"
    );


  characters.forEach((character, index) => {

    character.animate(

      [
        {
          transform:
            "translateY(0px) rotate(0deg)"
        },

        {
          transform:
            `translateY(-5px)
             rotate(${index % 2 === 0 ? 1 : -1}deg)`
        },

        {
          transform:
            "translateY(0px) rotate(0deg)"
        }
      ],

      {
        duration:
          3000 + index * 400,

        iterations:
          Infinity,

        easing:
          "ease-in-out"
      }

    );

  });

});

/* =========================
   WÄRME PROGRAM SLIDER
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".program-card");
  const dots = document.querySelectorAll(".pagination-dot");

  let currentIndex = 1;

  function updateMobileSlider(index) {

    currentIndex = index;

    cards.forEach((card, i) => {

      card.classList.toggle(
        "active",
        i === currentIndex
      );

    });

    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentIndex
      );

    });
  }


  /* -------------------------
     Pagination
  ------------------------- */

  dots.forEach((dot) => {

    dot.addEventListener("click", () => {

      const index =
        Number(dot.dataset.index);

      updateMobileSlider(index);

    });

  });


  /* -------------------------
     Swipe
  ------------------------- */

  let touchStartX = 0;
  let touchEndX = 0;

  const slider =
    document.querySelector(".program-slider");


  slider.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleSwipe();

    },
    { passive: true }
  );


  function handleSwipe() {

    const distance =
      touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
      return;
    }


    if (distance < 0) {

      currentIndex =
        Math.min(
          currentIndex + 1,
          cards.length - 1
        );

    } else {

      currentIndex =
        Math.max(
          currentIndex - 1,
          0
        );

    }

    updateMobileSlider(currentIndex);
  }


  /* -------------------------
     Mouse interaction
     Desktop
  ------------------------- */

  cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

      cards.forEach((item) => {
        item.classList.remove("hovered");
      });

      card.classList.add("hovered");

    });

  });


  slider.addEventListener("mouseleave", () => {

    cards.forEach((card) => {
      card.classList.remove("hovered");
    });

  });

// program
  /* -------------------------
     Resize
  ------------------------- */

  function handleResize() {

    if (window.innerWidth > 767) {

      cards.forEach((card, index) => {

        card.classList.remove("active");

        if (index === 1) {
          card.classList.add("active");
        }

      });

    } else {

      updateMobileSlider(currentIndex);

    }

  }


  window.addEventListener(
    "resize",
    handleResize
  );


  handleResize();

});

var swiper = new Swiper('.container_shop .mySwiper', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

   

  document.addEventListener(
  "DOMContentLoaded",
  function () {

    const slider =
      document.querySelector(
        ".warme-film"
      );


    if (!slider) {
      return;
    }


    const viewport =
      slider.querySelector(
        ".warme-film__viewport"
      );


    const track =
      slider.querySelector(
        ".warme-film__track"
      );


    const cards =
      Array.from(
        slider.querySelectorAll(
          ".film-card"
        )
      );


    const prevButton =
      slider.querySelector(
        ".warme-film__nav--prev"
      );


    const nextButton =
      slider.querySelector(
        ".warme-film__nav--next"
      );


    const progress =
      slider.querySelector(
        ".warme-film__progress-bar"
      );


    let currentIndex = 0;

    let touchStartX = 0;



    /* ============================
       GAP 가져오기
    ============================ */

    function getGap() {

      const style =
        window.getComputedStyle(
          track
        );


      return (
        parseFloat(
          style.gap
        ) || 0
      );

    }



    /* ============================
       현재 화면 카드 개수
    ============================ */

    function getVisibleCards() {

      if (
        window.innerWidth <= 767
      ) {

        return 1;

      }


      if (
        window.innerWidth <= 1000
      ) {

        return 3;

      }


      return 4;

    }



    /* ============================
       최대 이동 Index
    ============================ */

    function getMaxIndex() {

      return Math.max(
        cards.length -
        getVisibleCards(),
        0
      );

    }



    /* ============================
       Slider 업데이트
    ============================ */

    function updateSlider() {

      if (
        cards.length === 0
      ) {
        return;
      }


      const cardWidth =
        cards[0]
          .getBoundingClientRect()
          .width;


      const gap =
        getGap();


      const distance =
        currentIndex *
        (
          cardWidth +
          gap
        );


      track.style.transform =
        `translate3d(
          -${distance}px,
          0,
          0
        )`;



      /* PREV */

      if (prevButton) {

        prevButton.disabled =
          currentIndex === 0;

      }



      /* NEXT */

      if (nextButton) {

        nextButton.disabled =
          currentIndex ===
          getMaxIndex();

      }



      /* ========================
         PROGRESS BAR
      ======================== */

      if (progress) {

        const max =
          getMaxIndex();


        const steps =
          max + 1;


        const barWidth =
          100 / steps;


        let barPosition = 0;


        if (
          max > 0
        ) {

          barPosition =
            (
              currentIndex /
              max
            )
            *
            (
              100 -
              barWidth
            );

        }


        progress.style.width =
          `${barWidth}%`;


        progress.style.left =
          `${barPosition}%`;

      }

    }



    /* ============================
       NEXT
    ============================ */

    function nextSlide() {

      const max =
        getMaxIndex();


      if (
        currentIndex <
        max
      ) {

        currentIndex++;


        updateSlider();

      }

    }



    /* ============================
       PREV
    ============================ */

    function prevSlide() {

      if (
        currentIndex > 0
      ) {

        currentIndex--;


        updateSlider();

      }

    }



    nextButton?.addEventListener(
      "click",
      nextSlide
    );


    prevButton?.addEventListener(
      "click",
      prevSlide
    );



    /* ============================
       VIDEO
    ============================ */

    cards.forEach(
      function (card) {

        const video =
          card.querySelector(
            ".film-card__video"
          );


        const playButton =
          card.querySelector(
            ".film-card__play"
          );


        if (
          !video ||
          !playButton
        ) {

          return;

        }



        /* 다른 영상 정지 */

        function stopOthers() {

          cards.forEach(
            function (otherCard) {

              const otherVideo =
                otherCard.querySelector(
                  ".film-card__video"
                );


              if (
                otherVideo &&
                otherVideo !== video
              ) {

                otherVideo.pause();


                otherCard
                  .classList
                  .remove(
                    "is-playing"
                  );

              }

            }
          );

        }



        /* PLAY */

        playButton.addEventListener(
          "click",
          function (event) {

            event.stopPropagation();


            stopOthers();


            video
              .play()
              .then(
                function () {

                  card
                    .classList
                    .add(
                      "is-playing"
                    );

                }
              )
              .catch(
                function (error) {

                  console.log(
                    "Video error:",
                    error
                  );

                }
              );

          }
        );



        /* 영상 클릭 = 재생/정지 */

        video.addEventListener(
          "click",
          function () {


            if (
              video.paused
            ) {

              stopOthers();


              video.play();


              card
                .classList
                .add(
                  "is-playing"
                );

            }

            else {

              video.pause();


              card
                .classList
                .remove(
                  "is-playing"
                );

            }

          }
        );



        /* 끝나면 버튼 다시 표시 */

        video.addEventListener(
          "ended",
          function () {

            card
              .classList
              .remove(
                "is-playing"
              );

          }
        );

      }
    );



    /* ============================
       MOBILE SWIPE
    ============================ */

    viewport.addEventListener(
      "touchstart",
      function (event) {

        touchStartX =
          event.touches[0]
            .clientX;

      },
      {
        passive: true
      }
    );


    viewport.addEventListener(
      "touchend",
      function (event) {

        const touchEndX =
          event
            .changedTouches[0]
            .clientX;


        const distance =
          touchStartX -
          touchEndX;


        if (
          Math.abs(distance)
          < 45
        ) {

          return;

        }


        if (
          distance > 0
        ) {

          nextSlide();

        }

        else {

          prevSlide();

        }

      },
      {
        passive: true
      }
    );



    /* ============================
       RESIZE
    ============================ */

    window.addEventListener(
      "resize",
      function () {

        currentIndex =
          Math.min(
            currentIndex,
            getMaxIndex()
          );


        updateSlider();

      }
    );



    /* 초기 실행 */

    updateSlider();

  }
);

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const posterArea =
      document.querySelector(
        ".news-poster"
      );


    if (!posterArea) {
      return;
    }


    const track =
      posterArea.querySelector(
        ".poster-track"
      );


    const cards =
      Array.from(
        posterArea.querySelectorAll(
          ".poster-card"
        )
      );


    const dots =
      Array.from(
        posterArea.querySelectorAll(
          ".poster-dot"
        )
      );


    let currentIndex = 0;



    /* =========================
       SLIDER UPDATE
    ========================= */

    function updatePoster() {

      if (!cards.length) {
        return;
      }


      const cardWidth =
        cards[0]
          .getBoundingClientRect()
          .width;


      const style =
        getComputedStyle(track);


      const gap =
        parseFloat(style.gap) || 0;


      const move =
        currentIndex *
        (cardWidth + gap);


      track.style.transform =
        `translateX(-${move}px)`;


      dots.forEach(
        (dot, index) => {

          dot.classList.toggle(
            "active",
            index === currentIndex
          );

        }
      );

    }



    /* =========================
       DOT CLICK
    ========================= */

    dots.forEach(
      (dot) => {

        dot.addEventListener(
          "click",
          () => {

            currentIndex =
              Number(
                dot.dataset.index
              );


            updatePoster();

          }
        );

      }
    );



    /* =========================
       MOBILE SWIPE
    ========================= */

    let startX = 0;


    const slider =
      posterArea.querySelector(
        ".poster-slider"
      );


    slider.addEventListener(
      "touchstart",
      (event) => {

        startX =
          event.touches[0]
            .clientX;

      },
      {
        passive: true
      }
    );


    slider.addEventListener(
      "touchend",
      (event) => {

        const endX =
          event
            .changedTouches[0]
            .clientX;


        const distance =
          startX - endX;


        if (
          Math.abs(distance) < 40
        ) {
          return;
        }


        const maxIndex =
          Math.max(
            cards.length - 1,
            0
          );


        if (distance > 0) {

          currentIndex =
            Math.min(
              currentIndex + 1,
              maxIndex
            );

        }

        else {

          currentIndex =
            Math.max(
              currentIndex - 1,
              0
            );

        }


        updatePoster();

      },
      {
        passive: true
      }
    );



    window.addEventListener(
      "resize",
      updatePoster
    );


    updatePoster();

  }
);

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const tracks =
      document.querySelectorAll(
        ".journal-track"
      );


    if (!tracks.length) {
      return;
    }



    tracks.forEach(
      (track, trackIndex) => {

        /*
          첫 번째 줄 = 왼쪽 이동
          두 번째 줄 = 오른쪽 이동
        */

        const direction =
          track.classList.contains(
            "journal-track--right"
          )
            ? 1
            : -1;


        /*
          숫자가 작을수록 느림

          추천:
          0.25 ~ 0.45
        */

        const speed =
          trackIndex === 0
            ? 0.35
            : 0.28;


        let position = 0;

        let paused = false;

        let animationId = null;



        /* =========================
           절반 길이 구하기
        ========================= */

        function getHalfWidth() {

          return (
            track.scrollWidth / 2
          );

        }



        /* =========================
           ANIMATION
        ========================= */

        function animate() {

          if (!paused) {

            position +=
              speed *
              direction;


            const halfWidth =
              getHalfWidth();


            /*
              LEFT
            */

            if (
              direction === -1 &&
              Math.abs(position)
              >= halfWidth
            ) {

              position = 0;

            }


            /*
              RIGHT
            */

            if (
              direction === 1 &&
              position >= 0
            ) {

              position =
                -halfWidth;

            }


            track.style.transform =
              `translate3d(
                ${position}px,
                0,
                0
              )`;

          }


          animationId =
            requestAnimationFrame(
              animate
            );

        }



        /* 오른쪽 방향은
           처음부터 절반 이동 */

        if (direction === 1) {

          position =
            -getHalfWidth();

        }



        /* =========================
           HOVER = PAUSE
        ========================= */

        track.addEventListener(
          "mouseenter",
          () => {

            paused = true;

          }
        );


        track.addEventListener(
          "mouseleave",
          () => {

            paused = false;

          }
        );



        /* =========================
           TOUCH = PAUSE
        ========================= */

        track.addEventListener(
          "touchstart",
          () => {

            paused = true;

          },
          {
            passive: true
          }
        );


        track.addEventListener(
          "touchend",
          () => {

            paused = false;

          },
          {
            passive: true
          }
        );

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const section =
      document.querySelector(
        ".sweet-section"
      );


    if (!section) {
      return;
    }


    const track =
      section.querySelector(
        ".sweet-track"
      );


    const cards =
      Array.from(
        section.querySelectorAll(
          ".sweet-card"
        )
      );


    const nextButton =
      section.querySelector(
        ".sweet-next"
      );


    const currentText =
      section.querySelector(
        ".sweet-current"
      );


    const totalText =
      section.querySelector(
        ".sweet-total"
      );


    const progress =
      section.querySelector(
        ".sweet-progress-line span"
      );


    let currentIndex = 0;



    /* =========================
       TOTAL
    ========================= */

    totalText.textContent =
      String(cards.length)
        .padStart(2, "0");



    /* =========================
       VISIBLE COUNT
    ========================= */

    function getVisibleCount() {

      if (
        window.innerWidth <= 767
      ) {
        return 1;
      }


      if (
        window.innerWidth <= 1100
      ) {
        return 3;
      }


      return 4;

    }



    /* =========================
       MAX INDEX
    ========================= */

    function getMaxIndex() {

      return Math.max(
        cards.length -
        getVisibleCount(),
        0
      );

    }



    /* =========================
       UPDATE
    ========================= */

    function updateSlider() {

      if (!cards.length) {
        return;
      }


      const gap =
        parseFloat(
          getComputedStyle(track)
            .gap
        ) || 0;


      const cardWidth =
        cards[0]
          .getBoundingClientRect()
          .width;


      const distance =
        currentIndex *
        (cardWidth + gap);


      track.style.transform =
        `translate3d(-${distance}px, 0, 0)`;


      /*
        CURRENT
      */

      currentText.textContent =
        String(currentIndex + 1)
          .padStart(2, "0");


      /*
        PROGRESS
      */

      const max =
        Math.max(
          getMaxIndex(),
          1
        );


      const ratio =
        currentIndex / max;


      progress.style.width =
        `${20 + ratio * 80}%`;

    }



    /* =========================
       NEXT
    ========================= */

    nextButton?.addEventListener(
      "click",
      () => {

        const max =
          getMaxIndex();


        if (
          currentIndex >= max
        ) {

          currentIndex = 0;

        }

        else {

          currentIndex++;

        }


        updateSlider();

      }
    );



    /* =========================
       MOBILE SWIPE
    ========================= */

    let startX = 0;


    const viewport =
      section.querySelector(
        ".sweet-viewport"
      );


    viewport?.addEventListener(
      "touchstart",
      (event) => {

        startX =
          event.touches[0]
            .clientX;

      },
      {
        passive: true
      }
    );


    viewport?.addEventListener(
      "touchend",
      (event) => {

        const endX =
          event.changedTouches[0]
            .clientX;


        const distance =
          startX - endX;


        if (
          Math.abs(distance) < 45
        ) {
          return;
        }


        const max =
          getMaxIndex();


        if (distance > 0) {

          currentIndex =
            Math.min(
              currentIndex + 1,
              max
            );

        }

        else {

          currentIndex =
            Math.max(
              currentIndex - 1,
              0
            );

        }


        updateSlider();

      },
      {
        passive: true
      }
    );



    /* =========================
       RESIZE
    ========================= */

    window.addEventListener(
      "resize",
      () => {

        currentIndex =
          Math.min(
            currentIndex,
            getMaxIndex()
          );


        updateSlider();

      }
    );


    updateSlider();

  }
);

        /* =========================
           TAB VISIBILITY
        ========================= */

        document.addEventListener(
          "visibilitychange",
          () => {

            paused =
              document.hidden;

          }
        );



        animate();

      }
    );

  }
);

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const footerForm =
      document.querySelector(
        ".footer-form"
      );

    const footerEmail =
      document.querySelector(
        ".footer-email"
      );


    if (
      !footerForm ||
      !footerEmail
    ) {
      return;
    }


    footerForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const email =
          footerEmail
            .value
            .trim();


        if (!email) {
          return;
        }


        /*
          실제 뉴스레터 API 연결 전
          임시 동작
        */

        footerForm.classList.add(
          "is-success"
        );


        footerEmail.value = "";

        footerEmail.placeholder =
          "Thank you ♡";


        setTimeout(
          () => {

            footerEmail.placeholder =
              "Your email";

            footerForm.classList.remove(
              "is-success"
            );

          },
          2500
        );

      }
    );

  }
);