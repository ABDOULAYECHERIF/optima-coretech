/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. Common Js
03. Nice Select Js
04. magnificPopup img view
05. magnificPopup video view
05b. Home 11 hero reel modal (native video)
06. back to top
07. scroll wrapper
08. mobile menu Js
09. auto update year
10. Sidebar Js
11. Close Handlers (cartmini / body-overlay)
12. Search Js
13. portfolio-item-hover (service-item hover)
14. card-award hover (expanded image follows cursor)
15. panel pin section (at-panel-pin)
16. reveal-text
17. webgl images hover animation
18. Section to title zoom and item uper
19. anim-zoomin + gallery isotope
20. scale-img-from-to
21. text-scale-anim
22. text-scale-anim-2
23. scroll-scale-up-img
24. postbox-scroll-zoom
25. Sticky Header Js
26. scroll-brand-logo
27. move-up
28. at-about-svg-wrap
29. at-title-text
30. panel pin section (mg-portfolio-pin)
31. panel pin section (at-header-pin)
32. section-fix (pin section-title + stacking cards)
33. section-title-pin
34. data-countdown
35. at-item-anime marque
36. at-pricing-area
37. auto update year (.update-year)
38. fade-class-active
39. character Animation
40. Parallax Js
41. Archive blog sidebar_right sticky
42. ripple-image
43. Odometer counter
44. about-me-slider-active
45. slider-testimonial-thumbs
46. Carousel Ticker
47. customSwiper / slider-testimonial
48. scroll-move-up animation
49. scroll-move-up2 animation
50. zoom-in-full (badge-zoon-in)
51. scroll-section card stacking
52. change price / price plan toggle
53. scroll-rotate, scroll-move-right/left
54. Journey list vertical line
55. initPortfolioFilter
56. initProductDetails
57. initShopCart
58. text-scramble
****************************************************
****************************************************/

(function ($) {
    'use strict';

    var windowOn = $(window);

    ////////////////////////////////////////////////////
    // 01. PreLoader Js
    // windowOn.on('load', function () {
    //     setTimeout(function () {
    //         $('.page-loader').fadeOut('slow');
    //     }, 1000);
    //     gsap.to('.bar', 1.5, {
    //         delay: 0,
    //         height: 0,
    //         stagger: {
    //             amount: 0.5,
    //         },
    //         ease: 'power4.inOut',
    //     });
    // });
    // var logoLoading = document.querySelector('.page-loader-logo img');
    // logoLoading.addEventListener('load', function () {
    //     gsap.to(logoLoading, { duration: 1, scale: 1.5 });
    // });

    ////////////////////////////////////////////////////
    // 02. Common Js
    $('[data-background]').each(function () {
        $(this).css('background-image', 'url( ' + $(this).attr('data-background') + '  )');
    });

    $('[data-width]').each(function () {
        $(this).css('width', $(this).attr('data-width'));
    });

    $('[data-height]').each(function () {
        $(this).css('height', $(this).attr('data-height'));
    });

    $('[data-bg-color]').each(function () {
        $(this).css('background-color', $(this).attr('data-bg-color'));
    });

    $('[data-text-color]').each(function () {
        $(this).css('color', $(this).attr('data-text-color'));
    });

    ////////////////////////////////////////////////////
    // 03. Nice Select Js
    $('.at-select').niceSelect();

    ////////////////////////////////////////////////////
    // 04. magnificPopup img view
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
        },
    });

    ////////////////////////////////////////////////////
    // 05. magnificPopup video view
    $('.popup-video').magnificPopup({
        type: 'iframe',
    });

    ////////////////////////////////////////////////////
    // 05b. Home 11 hero reel modal (native video)
    var sec1Home11ReelModalEl = document.getElementById('sec1Home11ReelModal');
    var sec1Home11ReelVideoEl = document.getElementById('sec1Home11ReelVideo');
    if (sec1Home11ReelModalEl && sec1Home11ReelVideoEl) {
        // ScrollSmoother wraps #smooth-content with transforms; fixed modals must sit on body or they won't overlay the viewport
        if (sec1Home11ReelModalEl.parentElement !== document.body) {
            document.body.appendChild(sec1Home11ReelModalEl);
        }

        $(document).on('click', '.js-home-11-reel-modal-trigger', function (e) {
            e.preventDefault();
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                bootstrap.Modal.getOrCreateInstance(sec1Home11ReelModalEl).show();
            } else if ($.fn.modal) {
                $(sec1Home11ReelModalEl).modal('show');
            }
        });

        sec1Home11ReelModalEl.addEventListener('shown.bs.modal', function () {
            sec1Home11ReelVideoEl.play().catch(function () {});
        });
        sec1Home11ReelModalEl.addEventListener('hidden.bs.modal', function () {
            sec1Home11ReelVideoEl.pause();
            sec1Home11ReelVideoEl.currentTime = 0;
        });
    }

    ////////////////////////////////////////////////////
    // 06. back to top
    function back_to_top() {
        var $btn = $('#back_to_top');
        var $wrapper = $('.back-to-top-wrapper');

        // Scroll event (proper .on binding)
        windowOn.on('scroll', function () {
            if (windowOn.scrollTop() > 300) {
                $wrapper.addClass('back-to-top-btn-show');
            } else {
                $wrapper.removeClass('back-to-top-btn-show');
            }
        });

        // Click event (delegation-safe)
        $(document).on('click', '#back_to_top', function (e) {
            e.preventDefault();

            $('html, body').animate({ scrollTop: 0 }, 300);
        });
    }

    back_to_top();

    ////////////////////////////////////////////////////
    // 07. scroll wrapper
    if (typeof gsap !== 'undefined') {
        let tl = gsap.timeline();
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

        // Footer Fixed Bottom Reveal Effect (Kanso style) - Setup BEFORE ScrollSmoother
        const footerFixedBottom = document.querySelector('.footer-fixed-bottom');
        const footerFixedBottomInner = document.querySelector('.footer-fixed-bottom .at-footer-area');
        const footerPlaceholder = document.querySelector('.footer-placeholder');

        if (footerFixedBottom && footerPlaceholder) {
            // Cap placeholder at viewport height so <main> can't scroll past
            // the point where the footer is fully revealed (footer-2 can be
            // taller than the viewport — scrolling by full footer height
            // would push <main> entirely off-screen).
            const updatePlaceholderHeight = () => {
                const footerH = footerFixedBottom.offsetHeight;
                const viewportH = window.innerHeight;
                footerPlaceholder.style.height = Math.min(footerH, viewportH) + 'px';
            };

            updatePlaceholderHeight();

            window.addEventListener('resize', () => {
                updatePlaceholderHeight();
                ScrollTrigger.refresh();
            });
        }

        if ($('#smooth-wrapper').length && $('#smooth-content').length) {
            ScrollSmoother.create({
                smooth: 1.35,
                effects: true,
                smoothTouch: 0.15,
                ignoreMobileResize: true,
            });

            // Setup footer reveal animation after ScrollSmoother
            const mainElement = document.querySelector('#smooth-content main');

            if (footerFixedBottom && mainElement && footerPlaceholder) {
                // Set initial footer scale
                gsap.set(footerFixedBottomInner, { scale: 0.95 });

                // Create a timeline for synchronized animations
                const footerRevealTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: footerPlaceholder,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Animate main element pulling up
                // footerRevealTimeline.to(
                //     mainElement,
                //     {
                //         y: () => -footerFixedBottom.offsetHeight,
                //         ease: 'none',
                //     },
                //     0,
                // );

                // Animate footer scaling up (from 0.85 to 1.0)
                footerRevealTimeline.to(
                    footerFixedBottomInner,
                    {
                        scale: 1,
                        ease: 'none',
                    },
                    0,
                );
            }
        }
    }

    ////////////////////////////////////////////////////
    // 08. mobile menu Js
    var tpMenuWrap = $('.at-mobile-menu-active > ul').clone();
    var tpSideMenu = $('.at-offcanvas-menu nav');
    tpSideMenu.append(tpMenuWrap);
    if ($(tpSideMenu).find('.at-submenu').length != 0) {
        $(tpSideMenu).find('.at-submenu').parent().append('<button class="at-menu-close"><i class="fa-solid fa-plus"></i></button>');
    }
    var sideMenuList = $('.at-offcanvas-menu nav > ul > li button.at-menu-close, .at-offcanvas-menu nav > ul li.has-dropdown > a, .at-offcanvas-menu nav > ul li.has-dropdown > ul > li.menu-item-has-children > a');
    $(sideMenuList).on('click', function (e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('active')) {
            $(this).parent().addClass('active');
            $(this).siblings('.at-submenu').slideDown();
        } else {
            $(this).siblings('.at-submenu').slideUp();
            $(this).parent().removeClass('active');
        }
    });

    // px-offcanvas-2-area
    const $main_wrap = $('.at-offcanvas-2-area');
    const $openBtn = $('.hamburger-open-btn');
    const $closeBtn = $('.hamburger-close-btn');

    // Open menu
    $openBtn.on('click', function () {
        $main_wrap.addClass('menu-open');
        $openBtn.addClass('active');
        $closeBtn.addClass('active');
    });

    // Close menu
    $closeBtn.on('click', function () {
        $main_wrap.removeClass('menu-open');
        $main_wrap.addClass('menu-open-temp');
        setTimeout(() => {
            $main_wrap.removeClass('menu-open-temp');
        }, 2000);
        $openBtn.removeClass('active');
        $closeBtn.removeClass('active');
    });

    ////////////////////////////////////////////////////
    // 08.x Header 7 inline menu toggle
    $(document).on('click', '.header-7 .at-header-menu-btn', function (e) {
        e.preventDefault();
        const $btn = $(this);
        const $header = $btn.closest('.header-7');
        const isOpen = $header.hasClass('is-menu-open');

        $header.toggleClass('is-menu-open', !isOpen);
        $btn.attr('aria-expanded', String(!isOpen));
    });

    ////////////////////////////////////////////////////
    // 09. auto update year
    $('#year').text(new Date().getFullYear());

    ////////////////////////////////////////////////////
    // 10. Sidebar Js
    $('.at-menu-bar').on('click', function () {
        $('.at-offcanvas').addClass('opened');
        $('.body-overlay').addClass('apply');
    });
    $('.close-btn').on('click', function () {
        $('.at-offcanvas').removeClass('opened');
        $('.body-overlay').removeClass('apply');
    });
    $('.body-overlay').on('click', function () {
        $('.at-offcanvas').removeClass('opened');
        $('.body-overlay').removeClass('apply');
    });


    ////////////////////////////////////////////////////
    // 11. Close Handlers (cartmini / body-overlay)
    $('.cartmini-close-btn, .body-overlay').on('click', function () {
        $('.cartmini__area').removeClass('opened cartmini-opened');
        $('.body-overlay').removeClass('apply');
    });

    ////////////////////////////////////////////////////
    // 12. Search Js
    $('.at-search-click').on('click', function () {
        $('.at-search-form-toggle,.at-search-body-overlay').addClass('active');
    });

    $('.at-search-close,.at-search-body-overlay').on('click', function () {
        $('.at-search-form-toggle,.at-search-body-overlay').removeClass('active');
    });

    ////////////////////////////////////////////////////
    // 13. portfolio-item-hover (service-item hover)
    document.addEventListener('DOMContentLoaded', function () {
        let serviceItems = document.querySelectorAll('.service-item');
        let images = document.querySelectorAll('.hover-image');

        // initial state
        if (images.length > 0) {
            gsap.set(images, { opacity: 0, y: 50, scale: 1 });
            if (images[0]) {
                gsap.set(images[0], { opacity: 1, y: 0, zIndex: 2 });
            }
        }

        serviceItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function () {
                serviceItems.forEach((el) => el.classList.remove('active'));
                this.classList.add('active');
                images.forEach((img, i) => {
                    if (i === index) {
                        gsap.to(img, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            scrub: 1,
                            zIndex: 2,
                        });
                    } else {
                        gsap.to(img, {
                            opacity: 0,
                            y: 200,
                            duration: 0.8,
                            zIndex: 1,
                            scale: 0.8,
                        });
                    }
                });
            });
        });
    });

    ////////////////////////////////////////////////////
    // 14. card-award hover (expanded image follows cursor)
    if (
        typeof gsap !== 'undefined' &&
        document.querySelectorAll('.card-award, .sec-6-home-9__card[data-img-award], .sec-5-home-14__row[data-img-award]').length > 0
    ) {
        (function initCardAwardPreview() {
            const cards = document.querySelectorAll('.card-award, .sec-6-home-9__card[data-img-award], .sec-5-home-14__row[data-img-award]');
            let preview = document.querySelector('.card-award-hover-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.className = 'card-award-preview card-award-hover-preview';
                preview.innerHTML = '<img alt="" aria-hidden="true">';
                document.body.appendChild(preview);
            }
            const img = preview.querySelector('img');
            if (!img) return;
            const offsetX = 18;
            const offsetY = 18;
            let xTo = null;
            let yTo = null;
            let curCard = null;
            let hideTimeout = null;

            function getRotateOptions(card) {
                const rotateAttr = card.getAttribute('data-rotate');
                if (!rotateAttr) return { isReversed: false, rotation: -15 };
                const match = rotateAttr.match(/positive-(\d+)deg/i) || rotateAttr.match(/(\d+)deg/i);
                const deg = match ? parseInt(match[1], 10) : 15;
                const isPositive = /positive/i.test(rotateAttr);
                return { isReversed: isPositive, rotation: isPositive ? deg : -deg };
            }

            function updatePosition(e) {
                if (!xTo || !yTo || !curCard) return;
                const opts = getRotateOptions(curCard);
                const x = opts.isReversed ? e.clientX - offsetX : e.clientX + offsetX;
                xTo(x);
                yTo(e.clientY + offsetY);
            }

            function scheduleHide() {
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(function () {
                    hideTimeout = null;
                    const opts = curCard ? getRotateOptions(curCard) : { isReversed: false };
                    curCard = null;
                    gsap.to(preview, {
                        opacity: 0,
                        scale: opts.isReversed ? 1.2 : 0,
                        duration: 0.28,
                        ease: opts.isReversed ? 'power2.in' : 'power2.in',
                        onComplete: function () {
                            gsap.set(preview, { visibility: 'hidden' });
                        },
                    });
                }, 120);
            }

            function showPreview(card, e) {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                const src = card.getAttribute('data-img-award');
                if (!src) return;
                curCard = card;
                img.src = src;
                img.alt =
                    card.querySelector('.card-award-title')?.textContent?.trim() ||
                    card.querySelector('.sec-6-home-9__name')?.textContent?.trim() ||
                    card.querySelector('.sec-5-home-14__row-title')?.textContent?.trim() ||
                    '';
                const opts = getRotateOptions(card);

                if (opts.isReversed) {
                    gsap.set(preview, {
                        visibility: 'visible',
                        transformOrigin: 'right bottom',
                        rotation: opts.rotation,
                        x: e.clientX - offsetX,
                        y: e.clientY + offsetY,
                        xPercent: -100,
                        yPercent: -100,
                        scale: 0,
                        opacity: 0,
                    });
                    if (!xTo) xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' });
                    if (!yTo) yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' });
                    gsap.to(preview, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.15)',
                    });
                } else {
                    // Keep legacy behavior: right side of mouse, rotate -15deg, scale 0 -> 1
                    gsap.set(preview, {
                        visibility: 'visible',
                        transformOrigin: 'left bottom',
                        rotation: opts.rotation,
                        x: e.clientX + offsetX,
                        y: e.clientY + offsetY,
                        xPercent: 0,
                        yPercent: -100,
                        scale: 0,
                        opacity: 0,
                    });
                    if (!xTo) xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' });
                    if (!yTo) yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' });
                    gsap.to(preview, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.15)',
                    });
                }
            }
            cards.forEach(function (card) {
                const src = card.getAttribute('data-img-award');
                if (!src) return;

                card.addEventListener('mouseenter', function (e) {
                    if (window.innerWidth < 768) return;
                    showPreview(card, e);
                    card.addEventListener('mousemove', updatePosition);
                });

                card.addEventListener('mouseleave', function (e) {
                    card.removeEventListener('mousemove', updatePosition);
                    var related = e.relatedTarget;
                    var isEnteringCard =
                        related &&
                        related.closest &&
                        (related.closest('.card-award') || related.closest('.sec-6-home-9__card') || related.closest('.sec-5-home-14__row'));
                    if (isEnteringCard) return;
                    scheduleHide();
                });
            });
        })();
    }

    ////////////////////////////////////////////////////
    // 15. panel pin section (at-panel-pin)
    if (typeof gsap !== 'undefined') {
        let pr = gsap.matchMedia();
        pr.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.at-panel-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: 'top 5%',
                                end: 'bottom 90%',
                                endTrigger: '.at-panel-pin-area',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 16. reveal-text
    if ($('.reveal-text').length) {
        var textheading = $('.reveal-text');

        if (textheading.length === 0) return;
        gsap.registerPlugin(SplitText);
        textheading.each(function (index, el) {
            el.split = new SplitText(el, {
                type: 'lines,words,chars',
                linesClass: 'split-line',
            });

            if (el.split && el.split.chars && el.split.chars.length > 0) {
                if ($(el).hasClass('reveal-text')) {
                    gsap.set(el.split.chars, {
                        opacity: 0.4,
                        x: '-7',
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'top 20%',
                        markers: false,
                        scrub: 1,
                    },

                    x: '0',
                    y: '0',
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2,
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 17. webgl images hover animation
    if ($('.at-hover-item').length) {
        let hoverAnimation__do = function (t, n) {
            let a = new hoverEffect({
                parent: t.get(0),
                intensity: t.data('intensity') || void 0,
                speedIn: t.data('speedin') || void 0,
                speedOut: t.data('speedout') || void 0,
                easing: t.data('easing') || void 0,
                hover: t.data('hover') || void 0,
                image1: n.eq(0).attr('src'),
                image2: n.eq(0).attr('src'),
                displacementImage: t.data('displacement'),
                imagesRatio: n[0].height / n[0].width,
                hover: !1,
            });
            t.closest('.at-hover-item')
                .on('mouseenter', function () {
                    a.next();
                })
                .on('mouseleave', function () {
                    a.previous();
                });
        };
        let hoverAnimation = function () {
            $('.at-hover-img').each(function () {
                let n = $(this);
                let e = n.find('img');
                let i = e.eq(0);
                i[0].complete
                    ? hoverAnimation__do(n, e)
                    : i.on('load', function () {
                          hoverAnimation__do(n, e);
                      });
            });
        };
        hoverAnimation();
    }

    ////////////////////////////////////////////////////
    // 18. Section to title zoom and item uper
    if (typeof gsap !== 'undefined') {
        gsap.matchMedia().add('(min-width: 1200px)', () => {
            const portfolioArea = document.querySelector('.portfolio-area');
            const portfolioText = document.querySelector('.portfolio-text');

            if (portfolioArea && portfolioText) {
                // Timeline
                let portfolioline = gsap.timeline({
                    scrollTrigger: {
                        trigger: portfolioArea,
                        start: 'top center-=200',
                        pin: portfolioText,
                        end: 'bottom bottom+=10',
                        markers: false,
                        pinSpacing: false,
                        scrub: 1,
                        // markers: true,
                    },
                });

                // Get container dimensions for diagonal movement
                const areaRect = portfolioArea.getBoundingClientRect();
                const textRect = portfolioText.getBoundingClientRect();

                // Calculate end positions (bottom-right corner minus text size)
                const endX = areaRect.width - textRect.width - 50;
                const endY = areaRect.height - textRect.height - 50;

                portfolioline.fromTo(portfolioText, { x: 0, y: 0, scale: 1 }, { x: endX, y: endY, scale: 1, duration: 1, ease: 'none' });

                // Opacity scroll animation
                gsap.to(portfolioText, {
                    scrollTrigger: {
                        trigger: portfolioArea,
                        start: 'top center-=100',
                        end: 'bottom bottom+=10',
                        scrub: 1,
                    },
                    opacity: 0,
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 19. anim-zoomin + gallery isotope
    if (typeof gsap !== 'undefined') {
        $('.anim-zoomin').each(function () {
            // Add wrap <div>.
            $(this).wrap('<div class="anim-zoomin-wrap"></div>');

            // Add overflow hidden.
            $('.anim-zoomin-wrap').css({ overflow: 'hidden' });

            let $this = $(this);
            let $asiWrap = $this.parents('.anim-zoomin-wrap');

            if ($asiWrap.length && $this.length) {
                let tp_ZoomIn = gsap.timeline({
                    scrollTrigger: {
                        trigger: $asiWrap[0],
                        start: 'top 100%',
                        markers: false,
                    },
                });
                tp_ZoomIn.from($this[0], { duration: 2, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps: 'all' });
            }
        });
    }

    // Generic scroll parallax: any node with `data-scroll-parallax-range`

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const parallaxSelector = '[data-scroll-parallax-range], [data-h8-parallax-range], [scroll-parallax-range]';
        const photoBoxes = document.querySelectorAll(parallaxSelector);

        if (!reduceMotion && photoBoxes && photoBoxes.length) {
            const defaultRanges = [28, 110, 52, 92, 24, 125];
            const defaultEases = ['power1.out', 'power3.in', 'sine.inOut', 'expo.in', 'none', 'power2.inOut'];

            photoBoxes.forEach((box, index) => {
                const rawRange =
                    box.getAttribute('data-scroll-parallax-range')
                let range = rawRange != null && rawRange !== '' ? parseFloat(rawRange) : defaultRanges[index % defaultRanges.length];
                if (!Number.isFinite(range) || range <= 0) {
                    range = defaultRanges[index % defaultRanges.length];
                }

                const rawEase =
                    box.getAttribute('data-scroll-parallax-ease') ||
                    box.getAttribute('data-h8-parallax-ease') ||
                    box.getAttribute('scroll-parallax-ease');
                const easeName = rawEase != null && rawEase !== '' ? String(rawEase).trim() : defaultEases[index % defaultEases.length];

                if (window.innerWidth < 768) {
                    range *= 0.55;
                }

                const root = box.closest('[data-scroll-parallax-root]') || box.closest('section');
                if (!root) {
                    return;
                }

                const dir = index % 2 === 0 ? 1 : -1;
                const yStart = (range * 0.5) * dir;
                const yEnd = (-range * 0.5) * dir;

                gsap.fromTo(
                    box,
                    { y: yStart },
                    {
                        y: yEnd,
                        ease: easeName,
                        scrollTrigger: {
                            trigger: root,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.85,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            });
        }
    }

    // Home 8 sec-6 — cards parallax (different ranges = different scroll “speed”)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const sec6 = document.querySelector('.sec-6-home-8');
        const cards = sec6 ? sec6.querySelectorAll('.sec-6-home-8__card') : null;

        if (!reduceMotion && sec6 && cards && cards.length) {
            const defaultRanges = [28, 120, 42, 160, 34, 140, 80];
            const defaultEases = ['power1.out', 'expo.inOut', 'sine.inOut', 'power3.in', 'none', 'circ.inOut', 'power2.inOut'];

            cards.forEach((card, index) => {
                const raw = card.getAttribute('data-sec6-parallax-range');
                let range = raw != null && raw !== '' ? parseFloat(raw) : defaultRanges[index % defaultRanges.length];
                if (!Number.isFinite(range) || range <= 0) {
                    range = defaultRanges[index % defaultRanges.length];
                }

                const rawEase = card.getAttribute('data-sec6-parallax-ease');
                const easeName = rawEase != null && rawEase !== '' ? String(rawEase).trim() : defaultEases[index % defaultEases.length];

                if (window.innerWidth < 768) {
                    range *= 0.5;
                }

                const dir = index % 2 === 0 ? 1 : -1;
                const yStart = range * dir;
                const yEnd = -range * dir;

                gsap.fromTo(
                    card,
                    { y: yStart },
                    {
                        y: yEnd,
                        ease: easeName,
                        scrollTrigger: {
                            trigger: sec6,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.75,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            });
        }
    }

    // Home 8 sec-8 — pin stage, keep center at 20% viewport, scroll groups upward, then continue section scroll
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const sec8 = document.querySelector('.sec-8-home-8');
        const stage8 = sec8 ? sec8.querySelector('.sec-8-home-8__stage') : null;
        const center8 = sec8 ? sec8.querySelector('.sec-8-home-8__center') : null;
        const groups8 = sec8 ? Array.from(sec8.querySelectorAll('.sec-8-home-8__group')) : [];

        if (!reduceMotion && sec8 && stage8 && center8 && groups8.length) {
            const isNarrow = window.innerWidth < 992;
            if (!isNarrow) {
                const getMaxBottom = () => {
                    let max = 0;
                    groups8.forEach((el) => {
                        const b = el.offsetTop + el.offsetHeight;
                        if (b > max) max = b;
                    });
                    return max;
                };

                const getScrollDistance = () => {
                    const maxBottom = getMaxBottom();
                    // Only scroll as much as needed to move the last card set out.
                    // `center8.offsetTop` is the center's top position inside the stage.
                    const centerTop = center8.offsetTop || 0;
                    const base = Math.max(0, maxBottom - centerTop);
                    return Math.round(base);
                };

                const build = () => {
                    const scrollDistance = getScrollDistance();

                    gsap.set(center8, { willChange: 'transform' });
                    gsap.set(groups8, { willChange: 'transform' });

                    // Pin the whole stage so the center never drifts outside the section background.
                    // The center is already at `top 10%` at the moment the trigger starts,
                    // so avoid mutating its inline styles (prevents a visual "jump").

                    // Use a timeline so groups scrub while stage is pinned
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: center8,
                            start: 'top 10%',
                            end: `+=${scrollDistance}`,
                            pin: stage8,
                            pinSpacing: true,
                            scrub: 1,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    }).to(groups8, { y: -scrollDistance, ease: 'none' }, 0);
                };

                build();

                // Refresh on resize so distances stay correct
                window.addEventListener('resize', () => {
                    ScrollTrigger.refresh();
                });
            }
        }
    }

    // Home 10 sec-4 — pin the title-block at 10% viewport, keep cards scrolling (desktop only; tablet/mobile off)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const sec4 = document.querySelector('.sec-4-home-10');
        const titleBlock = sec4 ? sec4.querySelector('.sec-4-home-10__title-block') : null;

        if (!reduceMotion && sec4 && titleBlock) {
            gsap.matchMedia().add('(min-width: 992px)', () => {
                gsap.set(titleBlock, { willChange: 'transform' });

                ScrollTrigger.create({
                    trigger: titleBlock,
                    start: 'top 50%',
                    endTrigger: sec4,
                    end: 'bottom 10%',
                    pin: titleBlock,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                });
            });
        }
    }

    // Home 10 sec-5 — pin the intro-row at 10% viewport, keep within section
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const sec5 = document.querySelector('.sec-5-home-10');
        const introRow5 = sec5 ? sec5.querySelector('.sec-5-home-10__intro-row') : null;
        const stats5 = sec5 ? sec5.querySelector('.sec-5-home-10__stats') : null;

        if (!reduceMotion && sec5 && introRow5 && stats5) {
            gsap.set(introRow5, { willChange: 'transform', zIndex: 3 });

            ScrollTrigger.create({
                trigger: sec5,
                start: 'top top',
                endTrigger: stats5,
                end: 'top 50%',
                pin: introRow5,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onEnter: () => gsap.set(introRow5, { zIndex: 3 }),
                onEnterBack: () => gsap.set(introRow5, { zIndex: 3 }),
            });

            // Home 10 sec-5 — step pin stats:
            // - stat--1 pins when it hits top
            // - stat--2 pins when it hits top
            // - when stat--3 hits top, release all pins and continue scrolling
            const stat1 = sec5.querySelector('.sec-5-home-10__stat--1');
            const stat2 = sec5.querySelector('.sec-5-home-10__stat--2');
            const stat3 = sec5.querySelector('.sec-5-home-10__stat--3');

            if (stat1 && stat2 && stat3) {
                const pinCommon = {
                    start: 'top top',
                    endTrigger: stat3,
                    end: 'top top',
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                };

                gsap.set([stat1, stat2], { willChange: 'transform' });

                ScrollTrigger.create({
                    trigger: stat1,
                    pin: stat1,
                    ...pinCommon,
                });

                ScrollTrigger.create({
                    trigger: stat2,
                    pin: stat2,
                    ...pinCommon,
                });
            }
        }
    }

    // Home 10 / Home 15 sec-6 — pin the title-block at 50% viewport, keep members scrolling
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const teamPinTargets = [
            { section: '.sec-6-home-10', titleBlock: '.sec-6-home-10__title-block' },
            { section: '.sec-6-home-15', titleBlock: '.sec-6-home-15__title-block' },
        ];

        teamPinTargets.forEach(({ section, titleBlock }) => {
            const sec6 = document.querySelector(section);
            const titleBlock6 = sec6 ? sec6.querySelector(titleBlock) : null;

            if (!reduceMotion && sec6 && titleBlock6) {
                const isNarrow = window.innerWidth < 1200;
                if (!isNarrow) {
                    gsap.set(titleBlock6, { willChange: 'transform' });

                    ScrollTrigger.create({
                        trigger: titleBlock6,
                        start: 'top 60%',
                        endTrigger: sec6,
                        end: 'bottom 10%',
                        pin: titleBlock6,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    });
                }
            }
        });
    }

    // Home 15 sec-6 — scroll-scrubbed 3D flip (rotateX) on each member card.
    // Card enters viewport tilted back; un-tilts to flat as it scrolls from
    // "top bottom" (top of card meets bottom of viewport) to "top top" (top of card meets top of viewport).
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const flipCards = document.querySelectorAll('.sec-6-home-15__member');

        if (!reduceMotion && flipCards.length) {
            flipCards.forEach((card) => {
                gsap.set(card, {
                    transformPerspective: 1200,
                    transformOrigin: '50% 100%',
                    rotationX: 75,
                    force3D: true,
                    willChange: 'transform',
                });

                gsap.to(card, {
                    rotationX: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'top 30%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            });
        }
    }

    $('.gallery').isotope({
        itemSelector: '.items'
    });


    
    ////////////////////////////////////////////////////
    // 20. scale-img-from-to
    if (typeof gsap !== 'undefined') {
        const scaleImage = document.querySelectorAll('.scale-img-from-to');
        scaleImage.forEach((section) => {
            if (!section) return;
            var value1 = section.getAttribute('data-value-1');
            var value2 = section.getAttribute('data-value-2');

            if (window.innerWidth < 1200) {
                value1 = Math.max(0.95, value1);
            }

            gsap.fromTo(
                section,
                {
                    ease: 'sine',
                    scale: value1,
                },
                {
                    scale: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        });
    }

    ////////////////////////////////////////////////////
    // 21. text-scale-anim
    if (typeof gsap !== 'undefined') {
        const headings = document.querySelectorAll('.text-scale-anim');
        headings.forEach((heading) => {
            if (!heading) return;
            const textNodes = [];
            heading.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split(' ').forEach((word, index, array) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.classList.add('at-word-span');
                        word.split('').forEach((letter) => {
                            const letterSpan = document.createElement('span');
                            letterSpan.classList.add('at-letter-span');
                            letterSpan.textContent = letter;
                            wordSpan.appendChild(letterSpan);
                        });
                        textNodes.push(wordSpan);
                        if (index < array.length - 1) {
                            textNodes.push(document.createTextNode(' '));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });
            heading.innerHTML = '';
            textNodes.forEach((node) => heading.appendChild(node));

            const letters = heading.querySelectorAll('.at-letter-span');
            letters.forEach((letter, index) => {
                if (!letter) return;
                $(letter).on('mouseenter', () => {
                    // center letter
                    gsap.to(letter, {
                        scaleY: 1.6,
                        y: '-24%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // left neighbor
                    const prev = letters[index - 1];
                    if (prev) {
                        gsap.to(prev, {
                            scaleY: 1.3,
                            y: '-12%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }

                    // right neighbor
                    const next = letters[index + 1];
                    if (next) {
                        gsap.to(next, {
                            scaleY: 1.3,
                            y: '-12%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }
                });

                $(letter).on('mouseleave', () => {
                    // reset center letter
                    gsap.to(letter, {
                        scaleY: 1,
                        y: '0%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // reset left and right neighbors
                    const prev = letters[index - 1];
                    const next = letters[index + 1];
                    [prev, next].forEach((el) => {
                        if (el) {
                            gsap.to(el, {
                                scaleY: 1,
                                y: '0%',
                                duration: 0.4,
                                ease: 'sine',
                            });
                        }
                    });
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 22. text-scale-anim-2
    if (typeof gsap !== 'undefined') {
        const headings2 = document.querySelectorAll('.text-scale-anim-2');
        headings2.forEach((heading) => {
            if (!heading) return;
            const textNodes = [];
            heading.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split(' ').forEach((word, index, array) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.classList.add('at-word-span');
                        word.split('').forEach((letter) => {
                            const letterSpan = document.createElement('span');
                            letterSpan.classList.add('at-letter-span');
                            letterSpan.textContent = letter;
                            wordSpan.appendChild(letterSpan);
                        });
                        textNodes.push(wordSpan);
                        if (index < array.length - 1) {
                            textNodes.push(document.createTextNode(' '));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });
            heading.innerHTML = '';
            textNodes.forEach((node) => heading.appendChild(node));

            const letters = heading.querySelectorAll('.at-letter-span');
            letters.forEach((letter, index) => {
                if (!letter) return;
                $(letter).on('mouseenter', () => {
                    // center letter
                    gsap.to(letter, {
                        scaleY: 1.3,
                        y: '-14%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // left neighbor
                    const prev = letters[index - 1];
                    if (prev) {
                        gsap.to(prev, {
                            scaleY: 1.1,
                            y: '-5%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }

                    // right neighbor
                    const next = letters[index + 1];
                    if (next) {
                        gsap.to(next, {
                            scaleY: 1.1,
                            y: '-5%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }
                });

                $(letter).on('mouseleave', () => {
                    // reset center letter
                    gsap.to(letter, {
                        scaleY: 1,
                        y: '0%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // reset left and right neighbors
                    const prev = letters[index - 1];
                    const next = letters[index + 1];
                    [prev, next].forEach((el) => {
                        if (el) {
                            gsap.to(el, {
                                scaleY: 1,
                                y: '0%',
                                duration: 0.4,
                                ease: 'sine',
                            });
                        }
                    });
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 23. scroll-scale-up-img
    if (typeof gsap !== 'undefined') {
        document.querySelectorAll('.scale-up-img').forEach((section) => {
            if (!section) return;
            const scaleUpElement = section.querySelector('.scale-up');
            if (!scaleUpElement) return;

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false,
                },
            });

            tl.to(scaleUpElement, {
                scale: 1.15,
                duration: 1,
            });
        });
    }

    ////////////////////////////////////////////////////
    // 24. postbox-scroll-zoom (mặt nạ 200x100 ở giữa, mở rộng dần khi scroll để lộ ảnh)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        document.querySelectorAll('.postbox-scroll-zoom').forEach((section) => {
            const itemwrap = section.querySelector('.postbox-item');
            const img = section.querySelector('.postbox-scroll-zoom-img');
            const playBtn = section.querySelector('.postbox-scroll-zoom-play');
            const marquee = section.querySelector('.postbox-scroll-zoom-marquee');
            if (!itemwrap || !img || !playBtn) return;

            const REVEAL_W = 200;
            const REVEAL_H = 100;
            const RADIUS_START = 4;
            const RADIUS_END = 42;

            const computeInset = () => {
                const rect = img.getBoundingClientRect();
                const insetX = Math.max((rect.width - REVEAL_W) / 2, 0);
                const insetY = Math.max((rect.height - REVEAL_H) / 2, 0);
                return { insetX, insetY };
            };

            const setInitialClip = () => {
                const { insetX, insetY } = computeInset();
                gsap.set(img, { clipPath: `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round ${RADIUS_START}px)` });
            };
            setInitialClip();

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: itemwrap,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    scrub: 1,
                    toggleActions: 'play none none reverse',
                    markers: false,
                    invalidateOnRefresh: true,
                },
            });
            tl.fromTo(
                img,
                {
                    clipPath: () => {
                        const { insetX, insetY } = computeInset();
                        return `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round ${RADIUS_START}px)`;
                    },
                    ease: 'none',
                },
                {
                    clipPath: `inset(0px 0px 0px 0px round ${RADIUS_END}px)`,
                    duration: 1,
                    ease: 'none',
                },
                0,
            );
            if (marquee) {
                tl.fromTo(marquee, { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.6 }, 0);
            }
            tl.fromTo(playBtn, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: 'none' }, 0.78);
            tl.call(() => section.classList.add('postbox-scroll-zoom-ready'), [], 0.78);
        });
    }

    ////////////////////////////////////////////////////
    // 25. Sticky Header Js
    windowOn.on('scroll', function () {
        let scroll = windowOn.scrollTop();
        if (scroll < 20) {
            $('#header-sticky').removeClass('header-sticky');
        } else {
            $('#header-sticky').addClass('header-sticky');
        }
    });

    ////////////////////////////////////////////////////
    // 26. scroll-brand-logo
    if (typeof gsap !== 'undefined') {
        const LOGO_HEIGHT = window.matchMedia('(max-width: 991px)').matches ? 60 : 70;
        document.querySelectorAll('.at-brand-scroll .at-brand-item .brand').forEach((brandEl) => {
            const slides = Array.from(brandEl.querySelectorAll('.brand-logo-slide'));
            if (!slides.length) return;
            const viewport = document.createElement('div');
            viewport.className = 'brand-logo-viewport';
            const track = document.createElement('div');
            track.className = 'brand-logo-track';
            brandEl.insertBefore(viewport, slides[0]);
            viewport.appendChild(track);
            const shuffled = slides.slice().sort(() => Math.random() - 0.5);
            shuffled.forEach((s) => track.appendChild(s));
            const clone = shuffled[0].cloneNode(true);
            track.appendChild(clone);
            gsap.set(track, { y: 0 });
            const initialDelay = Math.random() * 1.5;
            const scrollDuration = 1;
            const pauseDuration = 1 + Math.random() * 0.8;
            const tl = gsap.timeline({ repeat: -1 });
            tl.to({}, { duration: initialDelay });
            for (let i = 0; i < shuffled.length; i++) {
                tl.to({}, { duration: pauseDuration });
                const yNext = -(i + 1) * LOGO_HEIGHT;
                tl.to(track, { y: yNext, duration: scrollDuration, ease: 'power2.inOut' });
            }
            tl.add(() => gsap.set(track, { y: 0 }));
        });
    }

    ////////////////////////////////////////////////////
    // 27. move-up
    if (typeof gsap !== 'undefined') {
        const moveUp = document.querySelectorAll('.move-up');
        if (moveUp.length > 0 && moveUp[0]) {
            gsap.to(Array.from(moveUp), {
                transformOrigin: 'top',
                y: '-500px',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: moveUp[0],
                    start: 'top center',
                    scrub: 1,
                },
            });
        }
    }

    ////////////////////////////////////////////////////
    // 28. at-about-svg-wrap
    if (typeof gsap !== 'undefined') {
        const aboutSvg = document.querySelectorAll('.at-about-svg-wrap');
        aboutSvg.forEach((svg) => {
            if (!svg) return;
            const svgLeft = svg.querySelector('svg:nth-child(1)');
            const svgCenter = svg.querySelector('svg:nth-child(2)');
            const svgRight = svg.querySelector('svg:nth-child(3)');

            if (svgLeft) {
                gsap.from(svgLeft, {
                    transformOrigin: 'left center',
                    duration: 1,
                    ease: 'power2.out',
                    x: '-100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
            if (svgCenter) {
                gsap.from(svgCenter, {
                    transformOrigin: 'center center',
                    duration: 1,
                    ease: 'power2.out',
                    y: '-100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
            if (svgRight) {
                gsap.from(svgRight, {
                    transformOrigin: 'right center',
                    duration: 1,
                    ease: 'power2.out',
                    x: '100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 29. at-title-text
    function initProject() {
        const titleElements = document.querySelectorAll('.at-title-text');
        if (!titleElements.length) return;

        titleElements.forEach((textEl) => {
            const text = textEl.textContent.trim();
            textEl.setAttribute('aria-label', text); // Accessibility

            const html = [...text]
                .map((char, i) => {
                    const safeChar = char === ' ' ? '&nbsp;' : char;
                    return `<span class="char" aria-hidden="true" style="--char:${i + 1};">${safeChar}</span>`;
                })
                .join('');

            textEl.innerHTML = html;
        });
    }

    initProject();

    ////////////////////////////////////////////////////
    // 30. panel pin section (mg-portfolio-pin)
    if (typeof gsap !== 'undefined') {
        let pr2 = gsap.matchMedia();
        pr2.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.mg-portfolio-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: 'top 5%',
                                end: 'bottom 90%',
                                endTrigger: '.mg-portfolio-area',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 31. panel pin section (at-header-pin)
    if (typeof gsap !== 'undefined') {
        let pr2 = gsap.matchMedia();
        pr2.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.at-header-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: '30% top',
                                end: 'bottom bottom',
                                endTrigger: '.home-2-section-13',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }
    ////////////////////////////////////////////////////
    // 32. section-fix (pin section-title + stacking cards)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        function buildSectionFixStack(sectionFix) {
            const sectionTitlePin = sectionFix.querySelector('.section-title-pin');
            const scrollSectionEl = sectionFix.querySelector('.scroll-section.vertical-section');
            if (!scrollSectionEl || !sectionTitlePin) return;
            const wrapper = scrollSectionEl.querySelector('.wrapper');
            if (!wrapper) return;
            const items = wrapper.querySelectorAll('.item');
            if (!items.length) return;

            items.forEach((item, index) => {
                if (index !== 0) gsap.set(item, { yPercent: 100 });
            });

            const scrollDistance = items.length * 50;
            const navList = sectionFix.querySelector('.navigation-active-item');
            const navItems = navList ? navList.querySelectorAll('li .item') : [];

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionFix,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${scrollDistance}%`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = Math.min(Math.max(self.progress, 0), 0.9999);
                        const index = Math.min(Math.floor(progress * items.length), items.length - 1);
                        items.forEach((el, i) => el.classList.toggle('active', i === index));
                        navItems.forEach((el, i) => el.classList.toggle('active', i === index));
                    },
                },
                defaults: { ease: 'none', duration: 1 },
            });

            items.forEach((item, index) => {
                tl.to(item, { scale: 0.9 });
                if (items[index + 1]) {
                    tl.to(items[index + 1], { yPercent: 0 }, '<');
                }
            });

            function updateActiveByProgress() {
                if (tl.scrollTrigger && tl.scrollTrigger.isActive()) {
                    const progress = Math.min(Math.max(tl.scrollTrigger.progress, 0), 0.9999);
                    const index = Math.min(Math.floor(progress * items.length), items.length - 1);
                    items.forEach((el, i) => el.classList.toggle('active', i === index));
                    navItems.forEach((el, i) => el.classList.toggle('active', i === index));
                }
            }
            ScrollTrigger.addEventListener('scroll', updateActiveByProgress);
        }

        function initSectionFix() {
            const sectionFixList = document.querySelectorAll('.section-fix');
            if (!sectionFixList.length) return;

            const mm = gsap.matchMedia();

            // Desktop: all section-fix rows (including Home 11 sec 6 stack).
            mm.add('(min-width: 992px)', () => {
                const ctx = gsap.context(() => {
                    sectionFixList.forEach((sectionFix) => buildSectionFixStack(sectionFix));
                });
                return () => ctx.revert();
            });

            // Mobile / tablet: skip Home 11 process stack (needs CSS reset — see _home-11.scss).
            mm.add('(max-width: 991px)', () => {
                const ctx = gsap.context(() => {
                    sectionFixList.forEach((sectionFix) => {
                        if (sectionFix.classList.contains('sec-6-home-11__layout')) return;
                        buildSectionFixStack(sectionFix);
                    });
                });
                return () => ctx.revert();
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSectionFix);
        } else {
            initSectionFix();
        }
        window.addEventListener('load', function () {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        });
    }

    ////////////////////////////////////////////////////
    // 33. section-title-pin
    if (typeof gsap !== 'undefined') {
        let pr3 = gsap.matchMedia();
        pr3.add('(min-width: 1400px)', () => {
            let panels = document.querySelectorAll('.section-title-pin');
            if (panels.length > 0) {
                panels.forEach((section) => {
                    if (!section || section.closest('.section-fix')) return;
                    gsap.to(section, {
                        scrollTrigger: {
                            trigger: section,
                            pin: section,
                            scrub: 1,
                            start: 'top bottom+=200',
                            endTrigger: section.closest('section') || 'body',
                            end: 'bottom top',
                            pinSpacing: false,
                        },
                    });
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 34. data-countdown
    if ($("[data-countdown]").length > 0) {
        let countdown = $("[data-countdown]");
        countdown.each(function () {
            var $this = $(this);
            var dateStr = $this.attr("data-countdown") || $this.data("countdown");
            if (!dateStr) return;
            var finalDate = new Date(dateStr.replace(/\//g, "-"));
            if (isNaN(finalDate.getTime())) return;

            function updateCountdown() {
                var now = new Date();
                var diff = finalDate.getTime() - now.getTime();
                if (diff <= 0) {
                    $this.html('<span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> days </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> hours </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> mins </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> secs </span></span>');
                    clearInterval(timer);
                    return;
                }
                var d = Math.floor(diff / (1000 * 60 * 60 * 24));
                var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var s = Math.floor((diff % (1000 * 60)) / 1000);
                $this.html(
                    '<span class="countdown-section"><span class="countdown-amount">' + d + '</span><span class="countdown-period"> days </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + h + '</span><span class="countdown-period"> hours </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + m + '</span><span class="countdown-period"> mins </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + s + '</span><span class="countdown-period"> secs </span></span>'
                );
            }
            updateCountdown();
            var timer = setInterval(updateCountdown, 1000);
        });
    }


    ////////////////////////////////////////////////////
    // 35. at-item-anime marque
    if (typeof gsap !== 'undefined') {
        if ($('.at-item-anime').length > 0) {
            const marqueElements = document.querySelectorAll('.at-item-anime.marque');
            const triggerElement = document.querySelector('.at-item-anime-area');
            if (marqueElements.length > 0 && triggerElement) {
                gsap.set(Array.from(marqueElements), {
                    x: '35%',
                });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: '-1000 0%',
                        end: 'bottom 0%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }).to(Array.from(marqueElements), {
                    x: '-200%',
                });
            }
        }
        // at-item-anime marque-2 (reverse direction)
        // Used by Home 8 sec-7 row 2: move left-to-right on scroll.
        if ($('.at-item-anime-2').length > 0) {
            const marqueElements2 = document.querySelectorAll('.at-item-anime-2.marque');
            const triggerElement2 = document.querySelector('.at-item-anime-area-2');
            if (marqueElements2.length > 0 && triggerElement2) {
                gsap.set(Array.from(marqueElements2), {
                    x: '-35%',
                });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement2,
                        start: '-1000 0%',
                        end: 'bottom 0%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }).to(Array.from(marqueElements2), {
                    x: '200%',
                });
            }
        }
    }

    ////////////////////////////////////////////////////
    // 36. at-pricing-area
    function tabtable_active() {
        const $elements = {
            monthly: $('#at-nav-monthly'),
            yearly: $('#at-nav-yearly'),
            switcher: $('#at-switcher-input'),
            tabMonthly: $('#at-tab-monthly'),
            tabYearly: $('#at-tab-yearly'),
        };

        const setActive = (isMonthly) => {
            $elements.switcher.prop('checked', isMonthly);
            $elements.monthly.toggleClass('is-active', isMonthly);
            $elements.yearly.toggleClass('is-active', !isMonthly);
            $elements.tabMonthly.toggleClass('at-tab-hide', !isMonthly);
            $elements.tabYearly.toggleClass('at-tab-hide', isMonthly);
        };

        [$elements.monthly, $elements.yearly].forEach(($el) => $el.on('click', () => setActive($el.is($elements.monthly))));

        $elements.switcher.on('click', () => setActive(!$elements.monthly.hasClass('is-active')));
    }
    if ($('#at-nav-monthly').length) tabtable_active();

    ////////////////////////////////////////////////////
    // 37. auto update year (.update-year)
    $('.update-year').text(new Date().getFullYear());

    ////////////////////////////////////////////////////
    // 38. fade-class-active
    if (typeof gsap !== 'undefined' && $('.at_fade_anim').length > 0) {
        gsap.utils.toArray('.at_fade_anim').forEach((item) => {
            if (!item) return;
            const tp_fade_offset = parseFloat(item.getAttribute('data-fade-offset')) || 20;
            const tp_duration_value = parseFloat(item.getAttribute('data-duration')) || 0.75;
            const tp_fade_direction = item.getAttribute('data-fade-from') || 'bottom';
            const tp_onscroll_attr = item.getAttribute('data-on-scroll');
            const tp_onscroll_value = tp_onscroll_attr === null ? 1 : parseInt(tp_onscroll_attr, 10);
            const tp_delay_parsed = parseFloat(item.getAttribute('data-delay'));
            const tp_delay_value = isNaN(tp_delay_parsed) ? 0.15 : tp_delay_parsed;
            const tp_ease_value = item.getAttribute('data-ease') || 'power2.out';
            const tp_start_value = item.getAttribute('data-start') || '85%';

            const tp_from_vars = {
                opacity: 0,
                x: tp_fade_direction == 'left' ? -tp_fade_offset : tp_fade_direction == 'right' ? tp_fade_offset : 0,
                y: tp_fade_direction == 'top' ? -tp_fade_offset : tp_fade_direction == 'bottom' ? tp_fade_offset : 0,
            };
            const tp_to_vars = {
                opacity: 1,
                x: 0,
                y: 0,
                ease: tp_ease_value,
                duration: tp_duration_value,
                delay: tp_delay_value,
            };
            if (tp_onscroll_value == 1) {
                tp_to_vars.scrollTrigger = {
                    trigger: item,
                    start: 'top ' + tp_start_value,
                    toggleActions: 'play none none none',
                };
            }
            gsap.fromTo(item, tp_from_vars, tp_to_vars);
        });
    }

    ////////////////////////////////////////////////////
    // 39. character Animation
    if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined' && $('.at-char-animation').length > 0) {
        let char_come = gsap.utils.toArray('.at-char-animation');
        char_come.forEach((splitTextLine) => {
            if (!splitTextLine) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none',
                },
            });
            const itemSplitted = new SplitText(splitTextLine, { type: 'chars, words' });
            if (!itemSplitted || !itemSplitted.chars || itemSplitted.chars.length === 0) return;

            gsap.set(splitTextLine, { perspective: 300 });
            itemSplitted.split({ type: 'chars, words' });
            tl.from(itemSplitted.chars, {
                duration: 1,
                delay: 0.5,
                x: 100,
                autoAlpha: 0,
                stagger: 0.05,
            });
        });
    }

    ////////////////////////////////////////////////////
    // 39b. Rise-up character Animation (chars rise from below the line baseline)
    if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined' && $('.at-rise-animation').length > 0) {
        gsap.utils.toArray('.at-rise-animation').forEach((target) => {
            if (!target) return;
            const split = new SplitText(target, {
                type: 'lines, words, chars',
                linesClass: 'split-line',
            });
            if (!split || !split.chars || split.chars.length === 0) return;

            gsap.set(split.chars, { yPercent: 110, willChange: 'transform' });

            gsap.to(split.chars, {
                yPercent: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.03,
                scrollTrigger: {
                    trigger: target,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        });
    }

    ////////////////////////////////////////////////////
    // 39c. Stack-on-scroll: home-12 selected projects
    // Pin the whole container, then slide each card up from below to land on
    // top of the previous one. Container stays pinned until the entire stack
    // is assembled, then the section scrolls away as a single unit.
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const stackContainer = document.querySelector('.sec-2-home-12__cards');
        const stackCards = stackContainer ? gsap.utils.toArray(stackContainer.querySelectorAll('.card-home-12-project')) : [];
        if (stackContainer && stackCards.length > 1) {
            gsap.matchMedia().add('(min-width: 992px)', () => {
                const stackTopOffset = 96;   // distance from viewport top for the first card
                const stackStep = 14;         // visible "peek" each landed card leaves above the next
                const stepScale = 0.025;      // how much each previous card shrinks when a new one lands
                const initialPeek = 50;       // initial gap below each card before scrolling starts

                // Measure tallest card BEFORE we remove cards from flow
                // (after going absolute, offsetHeight no longer reflects the
                // natural in-flow height the container needs to reserve).
                let tallest = 0;
                stackCards.forEach((c) => { tallest = Math.max(tallest, c.offsetHeight); });

                // Anchor every card at the same top position; layering = stacking order.
                stackCards.forEach((card, i) => {
                    gsap.set(card, {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        margin: 0,
                        zIndex: i + 1,
                    });
                });
                gsap.set(stackContainer, {
                    position: 'relative',
                    // Reserve room for the tallest card plus the initial peek
                    // gaps between every pair of cards.
                    height: tallest + initialPeek * (stackCards.length - 1),
                });

                // One unit of scroll distance per card hand-off.
                const stepDuration = () => window.innerHeight * 0.7;

                const tl = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: stackContainer,
                        start: () => 'top ' + stackTopOffset + 'px',
                        end: () => '+=' + stepDuration() * (stackCards.length - 1),
                        pin: true,
                        pinSpacing: true,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });

                // Cards 2..N start below the viewport, then slide up to land
                // on top of the stack with the configured peek offset.
                for (let i = 1; i < stackCards.length; i++) {
                    const incoming = stackCards[i];
                    gsap.set(incoming, { yPercent: 100 });

                    tl.to(incoming, { yPercent: 0, duration: 1 }, i - 1);

                    // Shrink every previously-landed card by one step.
                    for (let j = 0; j < i; j++) {
                        const offsetFromTop = (i - j) * stackStep;
                        const scaleAtThisStep = 1 - (i - j) * stepScale;
                        tl.to(stackCards[j], {
                            y: offsetFromTop,
                            scale: scaleAtThisStep,
                            duration: 1,
                        }, i - 1);
                    }
                }

                // Cards contain lazy images — refresh once they're loaded so
                // the tallest-card height measurement is accurate.
                if (typeof imagesLoaded === 'function') {
                    imagesLoaded(stackContainer, () => ScrollTrigger.refresh());
                }
            });
        }
    }

    ////////////////////////////////////////////////////
    // 40. Parallax Js
    if ($('.scene').length > 0) {
        $('.scene').parallax({
            scalarX: 5.0,
            scalarY: 5.0,
        });
    }
    if ($('.scene-y').length > 0) {
        $('.scene-y').parallax({
            scalarY: 5.0,
            scalarX: 0,
        });
    }


    ////////////////////////////////////////////////////
    // 41. Archive blog sidebar_right sticky
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        var archiveSection = document.querySelector('.sec-1-archive-2');
        if (archiveSection) {
            var archiveSidebar = archiveSection.querySelector('.sidebar_right');
            var archiveContentCol = archiveSection.querySelector('.row.pt-80 .col-lg-8');
            if (archiveSidebar && archiveContentCol) {
                gsap.matchMedia().add('(min-width: 992px)', function () {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: archiveContentCol,
                            start: 'top 50px',
                            end: 'bottom bottom',
                            scrub: 1,
                            pin: archiveSidebar,
                            pinSpacing: false,
                            invalidateOnRefresh: true,
                        },
                    });
                });
            }
        }
    }

    ////////////////////////////////////////////////////
    // 42. ripple-image
    imagesLoaded('.ripple-image img', { background: true }, () => {
        $('.ripple-image').each(function () {
            var $container = $(this);
            var $img = $container.find('img').first();
            var imgURL = $img.attr('src');

            $container.css({
                'background-image': 'url(' + imgURL + ')',
                'background-size': 'cover',
                'background-position': 'center center',
            });

            $container.ripples({
                resolution: 400,
                perturbance: 0.03,
                imageUrl: imgURL,
            });

            $img.hide();
        });
    });

    ////////////////////////////////////////////////////
    // 43. Odometer counter
    if ($('.odometer').length > 0) {
        $('.odometer').each(function () {
            var $this = $(this);
            var countNumber = $this.attr('data-count');

            $this.html('0');

            $this.appear(
                function () {
                    var $element = $(this);
                    if (!$element.hasClass('odometer-animated')) {
                        $element.addClass('odometer-animated');

                        setTimeout(function () {
                            $element.html(countNumber);
                        }, 100);
                    }
                },
                {
                    accY: -50,
                },
            );
        });
    }

    ////////////////////////////////////////////////////
    // 44. about-me-slider-active
    var portfolio = new Swiper('.about-me-slider-active', {
		slidesPerView: 2,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 30,
		breakpoints: {
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		a11y: false,
	});
    ////////////////////////////////////////////////////
    // 45. slider-testimonial-thumbs
    if ($('.slider-testimonial-thumbs').length > 0) {
        const thumbsWrap = document.querySelector('.slider-testimonial-thumbs');
        const sectionTrigger = thumbsWrap.closest('section');
        const thumb1 = thumbsWrap.querySelector('.swiper-slide:nth-child(1)');
        const thumb2 = thumbsWrap.querySelector('.swiper-slide:nth-child(2)');
        const thumb4 = thumbsWrap.querySelector('.swiper-slide:nth-child(4)');
        const thumb5 = thumbsWrap.querySelector('.swiper-slide:nth-child(5)');

        const mmThumbs = gsap.matchMedia();
        const thumbs = [thumb1, thumb2, thumb4, thumb5].filter(Boolean);

        // xs (< 575px): no effect, keep thumbs at original position (match $xs)
        mmThumbs.add('(max-width: 574.98px)', () => {
            gsap.set(thumbs, { clearProps: 'x,y' });
            return () => {};
        });

        // Mobile / tablet ($sm + $md: 576px – 991px)
        mmThumbs.add('(min-width: 576px) and (max-width: 1399px)', () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionTrigger,
                    start: 'top 50%',
                    end: 'bottom 70%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            tl.to(thumb1, { x: -70, y: 20, duration: 1 }, 0).to(thumb2, { x: -80, y: -60, duration: 1 }, 0).to(thumb4, { x: 70, y: -86, duration: 1 }, 0).to(thumb5, { x: 65, y: 15, duration: 1 }, 0);
            return () => tl.kill();
        });

        // Desktop (>= 992px) – match $lg
        mmThumbs.add('(min-width: 1400px)', () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionTrigger,
                    start: 'top 50%',
                    end: 'bottom 70%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            tl.to(thumb1, { x: -500, y: 200, duration: 1 }, 0).to(thumb2, { x: -200, y: -100, duration: 1 }, 0).to(thumb4, { x: 300, y: -70, duration: 1 }, 0).to(thumb5, { x: 500, y: 200, duration: 1 }, 0);
            return () => tl.kill();
        });
    }
    ////////////////////////////////////////////////////
    // 46. Carousel Ticker
    function carauselScroll() {
        $('.carouselTicker-left').each(function () {
            $(this).carouselTicker({
                direction: 'prev',
                speed: 1,
                delay: 40,
            });
        });
        $('.carouselTicker-right').each(function () {
            $(this).carouselTicker({
                direction: 'next',
                speed: 1,
                delay: 40,
            });
        });
    }
    carauselScroll();

    ////////////////////////////////////////////////////
    // 46.1 GSAP Marquee (continuous, bidirectional)
    // Usage:
    // <div class="at-marquee" data-direction="left|right" data-speed="80">
    //   <div class="at-marquee__track">
    //     <div class="at-marquee__group">...</div>
    //   </div>
    // </div>
    function initGsapMarquee() {
        if (typeof gsap === 'undefined') return;

        /* sec-5-home-9 + sec-1-home-10 use CSS @keyframes (avoid GSAP transform conflicts) */
        const marquees = document.querySelectorAll('.at-marquee:not(.sec-5-home-9__marquee):not(.sec-1-home-10__marquee)');
        if (!marquees.length) return;

        marquees.forEach((marquee) => {
            const track = marquee.querySelector('.at-marquee__track');
            const group = marquee.querySelector('.at-marquee__group');
            if (!track || !group) return;

            // Ensure we have at least 2 groups for seamless wrap
            if (track.querySelectorAll('.at-marquee__group').length < 2) {
                track.appendChild(group.cloneNode(true));
            }

            const direction = (marquee.dataset.direction || 'left').toLowerCase();
            const speed = Math.max(10, parseFloat(marquee.dataset.speed || '80')); // px/sec

            const measure = () => {
                const w = group.offsetWidth || group.getBoundingClientRect().width || group.scrollWidth || 0;
                return w;
            };

            const start = () => {
                const groupWidth = measure();
                if (!groupWidth || !Number.isFinite(groupWidth)) return;

                gsap.killTweensOf(track);

                const dur = groupWidth / speed;

                // No gsap.utils.wrap — repeat:-1 already snaps from → to; with two
                // identical groups side-by-side the jump at cycle end is invisible.
                if (direction === 'right') {
                    gsap.fromTo(
                        track,
                        { x: 0 },
                        {
                            x: groupWidth,
                            duration: dur,
                            ease: 'none',
                            repeat: -1,
                        }
                    );
                } else {
                    gsap.fromTo(
                        track,
                        { x: 0 },
                        {
                            x: -groupWidth,
                            duration: dur,
                            ease: 'none',
                            repeat: -1,
                        }
                    );
                }
            };

            // Measure after layout/fonts (fixes width: 0 on first paint)
            requestAnimationFrame(() => {
                requestAnimationFrame(start);
            });
            window.addEventListener('resize', start);
        });
    }
    initGsapMarquee();

    ////////////////////////////////////////////////////
    // 47. customSwiper / slider-testimonial
    function customSwiper() {
        const sliderTestimonial = new Swiper('.slider-testimonial', {
            slidesPerView: 4,
            spaceBetween: 35,
            slidesPerGroup: 1,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
        });

        var sliderTestimonialThumbs = new Swiper('.slider-testimonial-thumbs', {
            spaceBetween: 0,
            slidesPerView: 5,
            freeMode: true,
            loop: true,
        });
        const sliderTestimonial2 = new Swiper('.slider-testimonial-2', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            thumbs: {
                swiper: sliderTestimonialThumbs,
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
        });
    }
    customSwiper();

    ////////////////////////////////////////////////////
    // 47b. sec-1-home-12-slider — continuous marquee strip
    if ($('.sec-1-home-12-slider').length > 0) {
        new Swiper('.sec-1-home-12-slider', {
            slidesPerView: 6,
            spaceBetween: 16,
            loop: true,
            centeredSlides: true,
            speed: 6000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            grabCursor: true,
            freeMode: {
                enabled: true,
                momentum: false,
            },
            a11y: false,
            breakpoints: {
                1700: { slidesPerView: 6, spaceBetween: 16 },
                1400: { slidesPerView: 5, spaceBetween: 16 },
                1200: { slidesPerView: 4.5, spaceBetween: 16 },
                992:  { slidesPerView: 4, spaceBetween: 14 },
                768:  { slidesPerView: 3, spaceBetween: 12 },
                576:  { slidesPerView: 2.5, spaceBetween: 12 },
                0:    { slidesPerView: 2, spaceBetween: 10 },
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47b-2. sec-6-home-12-slider — brand logos marquee
    if ($('.sec-6-home-12-slider').length > 0) {
        new Swiper('.sec-6-home-12-slider', {
            slidesPerView: 6,
            spaceBetween: 64,
            loop: true,
            centeredSlides: false,
            speed: 6000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            grabCursor: true,
            freeMode: {
                enabled: true,
                momentum: false,
            },
            a11y: false,
            breakpoints: {
                1400: { slidesPerView: 6, spaceBetween: 64 },
                1200: { slidesPerView: 5, spaceBetween: 48 },
                992:  { slidesPerView: 5, spaceBetween: 40 },
                768:  { slidesPerView: 4, spaceBetween: 32 },
                576:  { slidesPerView: 3, spaceBetween: 24 },
                0:    { slidesPerView: 2.5, spaceBetween: 20 },
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47b-3. sec-1-home-13 — main hero slider + service thumbs
    if ($('.sec-1-home-13__main').length > 0 && $('.sec-1-home-13__thumbs').length > 0) {
        const sec1Home13Thumbs = new Swiper('.sec-1-home-13__thumbs', {
            slidesPerView: 5,
            spaceBetween: 16,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            a11y: false,
            breakpoints: {
                1400: { slidesPerView: 5, spaceBetween: 16 },
                1200: { slidesPerView: 5, spaceBetween: 12 },
                992:  { slidesPerView: 4, spaceBetween: 12 },
                768:  { slidesPerView: 3, spaceBetween: 12 },
                576:  { slidesPerView: 2, spaceBetween: 10 },
                0:    { slidesPerView: 1.4, spaceBetween: 10 },
            },
        });

        new Swiper('.sec-1-home-13__main', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 700,
            loop: true,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.sec-1-home-13 .swiper-btn-next',
                prevEl: '.sec-1-home-13 .swiper-btn-prev',
            },
            thumbs: {
                swiper: sec1Home13Thumbs,
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47b-4. sec-7-home-13 — testimonial: media + quote synced sliders
    if ($('.sec-7-home-13__media-slider').length > 0 && $('.sec-7-home-13__quote-slider').length > 0) {
        const sec7Home13Media = new Swiper('.sec-7-home-13__media-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            grabCursor: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
        });

        const sec7Home13Quote = new Swiper('.sec-7-home-13__quote-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            grabCursor: true,
            autoHeight: true,
        });

        sec7Home13Media.controller.control = sec7Home13Quote;
        sec7Home13Quote.controller.control = sec7Home13Media;
    }

    ////////////////////////////////////////////////////
    // 47b-5. sec-7-home-14 — client stories fade slider
    if ($('.sec-7-home-14__slider').length > 0) {
        const $counter7h14 = $('.sec-7-home-14__nav-count-current');
        const pad7h14 = (n) => String(n).padStart(2, '0');

        new Swiper('.sec-7-home-14__slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 700,
            loop: true,
            grabCursor: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoHeight: true,
            navigation: {
                nextEl: '.sec-7-home-14 .swiper-btn-next',
                prevEl: '.sec-7-home-14 .swiper-btn-prev',
            },
            on: {
                slideChange: function () {
                    $counter7h14.text(pad7h14(this.realIndex + 1));
                },
                init: function () {
                    $counter7h14.text(pad7h14(this.realIndex + 1));
                },
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47b-6. sec-8-home-15 — testimonials fade slider + thumbnail navigation
    if ($('.sec-8-home-15__slider').length > 0 && $('.sec-8-home-15__thumbs').length > 0) {
        const sec8Home15Thumbs = new Swiper('.sec-8-home-15__thumbs', {
            slidesPerView: 5,
            spaceBetween: 16,
            centeredSlides: false,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            allowTouchMove: false,
            a11y: false,
            breakpoints: {
                1200: { slidesPerView: 5, spaceBetween: 16 },
                992:  { slidesPerView: 5, spaceBetween: 14 },
                768:  { slidesPerView: 5, spaceBetween: 12 },
                576:  { slidesPerView: 5, spaceBetween: 10 },
                0:    { slidesPerView: 5, spaceBetween: 8 },
            },
        });

        new Swiper('.sec-8-home-15__slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 700,
            loop: true,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoHeight: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            thumbs: {
                swiper: sec8Home15Thumbs,
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47c. sec-1-portfolio-details-5 — fade hero with counter + bars + prev/next
    if ($('.sec-1-portfolio-details-5__slider').length > 0) {
        const $counterNum = $('.sec-1-portfolio-details-5__counter-num');
        const pad = (n) => String(n).padStart(2, '0');

        new Swiper('.sec-1-portfolio-details-5__slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            loop: true,
            grabCursor: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.sec-1-portfolio-details-5__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.sec-1-portfolio-details-5__nav--next',
                prevEl: '.sec-1-portfolio-details-5__nav--prev',
            },
            on: {
                slideChange: function () {
                    $counterNum.text(pad(this.realIndex + 1));
                },
                init: function () {
                    $counterNum.text(pad(this.realIndex + 1));
                },
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47d. sec-3-portfolio-details-6 — horizontal scroll gallery
    if ($('.sec-3-portfolio-details-6__slider').length > 0) {
        const $captionNum = $('.sec-3-portfolio-details-6__caption-num');
        const totalSlides6 = $('.sec-3-portfolio-details-6__slider .swiper-slide').length;
        const pad6 = (n) => String(n).padStart(2, '0');
        const totalPadded = pad6(totalSlides6);

        new Swiper('.sec-3-portfolio-details-6__slider', {
            slidesPerView: 'auto',
            spaceBetween: 24,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: '.sec-3-portfolio-details-6__nav--next',
                prevEl: '.sec-3-portfolio-details-6__nav--prev',
            },
            on: {
                slideChange: function () {
                    $captionNum.text(pad6(this.realIndex + 1) + ' / ' + totalPadded);
                },
                init: function () {
                    $captionNum.text(pad6(this.realIndex + 1) + ' / ' + totalPadded);
                },
            },
        });
    }

    ////////////////////////////////////////////////////
    // 47b-5. sec-8-home-13 — hover item swaps preview image + lede
    if ($('.sec-8-home-13__item').length > 0) {
        const $items = $('.sec-8-home-13__item');
        const $media = $('.sec-8-home-13__media');
        const $mediaImg = $media.find('img');
        const $lede = $('.sec-8-home-13__lede');
        let swapTimer = null;

        $items.on('mouseenter focusin', function () {
            const $item = $(this);
            if ($item.hasClass('sec-8-home-13__item--active')) return;

            const img = $item.attr('data-img');
            const lede = $item.attr('data-lede');

            $items.removeClass('sec-8-home-13__item--active');
            $item.addClass('sec-8-home-13__item--active');

            if (swapTimer) clearTimeout(swapTimer);
            $media.addClass('is-changing');
            $lede.addClass('is-changing');

            swapTimer = setTimeout(function () {
                if (img) $mediaImg.attr('src', img);
                if (lede) $lede.text(lede);
                $media.removeClass('is-changing');
                $lede.removeClass('is-changing');
            }, 280);
        });
    }

    ////////////////////////////////////////////////////
    // 47c. main menu — text swap hover animation (all headers)
    $('.at-main-menu > nav > ul > li > a').each(function () {
        var $a = $(this);
        if ($a.find('.at-link-swap').length) return;
        var $textNode = $a.contents().filter(function () {
            return this.nodeType === 3 && this.nodeValue.trim() !== '';
        }).first();
        if (!$textNode.length) return;
        var text = $textNode.text().trim();
        $textNode.replaceWith(
            '<span class="at-link-swap">' +
                '<span class="text-1">' + text + '</span>' +
                '<span class="text-2">' + text + '</span>' +
            '</span>'
        );
    });

    ////////////////////////////////////////////////////
    // 48. scroll-move-up animation — desktop only (≥992px)
    if (typeof gsap !== 'undefined' && $('.scroll-move-up').length > 0) {
        gsap.matchMedia().add('(min-width: 992px)', () => {
            let scrollMoveUp = document.querySelectorAll('.scroll-move-up');
            scrollMoveUp.forEach((scrollMoveUp) => {
                if (!scrollMoveUp) return;
                gsap.to(scrollMoveUp, {
                    y: -100,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: scrollMoveUp,
                        start: 'top 70%',
                        scrub: 1,
                        markers: false,
                    },
                });
            });
        });
    }
    ////////////////////////////////////////////////////
    // 49. scroll-move-up2 animation
    if (typeof gsap !== 'undefined' && $('.scroll-move-up2').length > 0) {
        gsap.matchMedia().add('(min-width: 768px)', () => {
            let items = document.querySelectorAll('.scroll-move-up2');
            items.forEach((item) => {
                if (!item) return;
                gsap.from(item, 1.5, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                        duration: 1.5,
                        ease: 'power4.inOut',
                        markers: false,
                    },
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 50. zoom-in-full (badge-zoon-in)
    if (typeof gsap !== 'undefined' && $('.badge-zoon-in').length > 0) {
        gsap.to('.badge-zoon-in', {
            scale: 25,
            rotation: 180,
            duration: 3,
            scrollTrigger: {
                trigger: '.badge-zoon-in',
                start: 'top 60%',
                end: 'bottom 0%',
                scrub: 1,
                markers: false,
            },
        });
        gsap.to('.badge-text-zoom-in', {
            scale: 8,
            duration: 3,
            scrollTrigger: {
                trigger: '.badge-text-zoom-in',
                start: 'top 70%',
                end: 'bottom 0%',
                scrub: 1,
                markers: false,
            },
        });
    }

    ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // 51. scroll-section card stacking
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        function initScrollSectionStack() {
            const scrollSection = document.querySelectorAll('.scroll-section');
            scrollSection.forEach((section) => {
                if (section.closest('.section-fix')) return;
                const wrapper = section.querySelector('.wrapper');
                const items = wrapper ? wrapper.querySelectorAll('.item') : [];
                if (!items.length) return;
                let direction = section.classList.contains('horizontal-section') ? 'horizontal' : 'vertical';
                initScroll(section, items, direction);
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initScrollSectionStack();
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            });
        } else {
            initScrollSectionStack();
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
    }

    function initScroll(section, items, direction) {
        // Initial states + z-index so stacked absolute items show in correct order (current on top)
        items.forEach((item, index) => {
            gsap.set(item, { zIndex: index });
            if (index !== 0) {
                direction == 'horizontal' ? gsap.set(item, { xPercent: 100 }) : gsap.set(item, { yPercent: 100 });
            }
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: 'top top',
                end: () => `+=${items.length * 50}%`,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true,
            },
            defaults: { ease: 'none' },
        });
        items.forEach((item, index) => {
            timeline.to(item, {
                scale: 0.9,
            });

            direction == 'horizontal'
                ? timeline.to(
                      items[index + 1],
                      {
                          xPercent: 0,
                      },
                      '<',
                  )
                : timeline.to(
                      items[index + 1],
                      {
                          yPercent: 0,
                      },
                      '<',
                  );
        });
    }

    ////////////////////////////////////////////////////
    // 52. change price / price plan toggle
    function updatePriceByPlan(isBusiness) {
        if (isBusiness) {
            $('.text-price-starter').html('$2,400');
            $('.text-price-growth').html('$5,600');
            $('.text-price-scale').html('$7,200');
        } else {
            $('.text-price-starter').html('$1,200');
            $('.text-price-growth').html('$2,800');
            $('.text-price-scale').html('$3,600');
        }
    }
    $('.change-price-plan .price-plan-toggle__input').on('change', function () {
        updatePriceByPlan($(this).is(':checked'));
    });
    $('.change-price-plan .price-plan-toggle-label').on('click', function () {
        var plan = $(this).attr('data-plan');
        var $input = $('#price-plan-toggle');
        if (plan === 'business') {
            $input.prop('checked', true);
        } else {
            $input.prop('checked', false);
        }
        updatePriceByPlan($input.is(':checked'));
    });

    ////////////////////////////////////////////////////
    // 53. scroll-rotate, scroll-move-right/left
    let scrollRotate = document.querySelectorAll('.scroll-rotate');
    scrollRotate.forEach((scrollRotate) => {
        gsap.to(scrollRotate, {
            scrollTrigger: {
                trigger: scrollRotate,
                scrub: 2,
            },
            rotation: 720,
        });
    });
    let scrollMoveRight = document.querySelectorAll('.scroll-move-right');
    scrollMoveRight.forEach((scrollMoveRight) => {
        gsap.to(scrollMoveRight, {
            x: 500,
            duration: 1.5,
            scrollTrigger: {
                trigger: scrollMoveRight,
                start: 'top 30%',
                scrub: 2,
            },
        });
    });

    let scrollMoveLeft = document.querySelectorAll('.scroll-move-left');
    scrollMoveLeft.forEach((scrollMoveLeft) => {
        gsap.to(scrollMoveLeft, {
            x: -500,
            duration: 1.5,
            scrollTrigger: {
                trigger: scrollMoveLeft,
                start: 'bottom 100%',
                scrub: 2,
                // markers: true,
            },
        });
    });

    ////////////////////////////////////////////////////
    // 54. Journey list vertical line
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const journeyListWrap = document.querySelector('.journey-list-wrap');
        const journeyListLine = document.querySelector('.journey-list-line');
        if (journeyListWrap && journeyListLine) {
            gsap.set(journeyListLine, { height: 0 });
            gsap.to(journeyListLine, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: journeyListWrap,
                    start: 'top 50%',
                    end: 'top top',
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });
        }
    }

    ////////////////////////////////////////////////////
    // 55. initPortfolioFilter
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-portfolio .filter-btn');
        const portfolioCards = document.querySelectorAll('.mg-portfolio-item, .card-portfolio, .card_case__studies, .blog-card, .blog-card-2, .product-card');

        if (filterButtons.length === 0 || portfolioCards.length === 0) {
            return;
        }

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const wasActive = this.classList.contains('active');

                // Remove active class from all buttons
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                // If clicking the already-active button, clear filter (show all); otherwise activate clicked button
                if (!wasActive) {
                    this.classList.add('active');
                }

                // Use 'all' when clearing filter (click on active button), else use button's data-filter
                const filterValue = wasActive ? 'all' : this.getAttribute('data-filter');

                // Collect visible cards for stagger animation
                const visibleCards = [];
                portfolioCards.forEach(function (card) {
                    const cardCategory = card.getAttribute('data-category');
                    const isVisible = filterValue === 'all' || cardCategory === filterValue;

                    if (isVisible) {
                        visibleCards.push(card);
                    } else {
                        // Hide card with fade out animation
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-5px)';
                        card.style.display = 'none';
                        card.style.transform = '';
                        
                    }
                });

                // Show visible cards with slide-up + fade in, with stagger
                var staggerDelayMs = 60;
                var fadeDurationMs = 400;
                visibleCards.forEach(function (card, index) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(24px)';
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                    var delay = index * staggerDelayMs;
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10 + delay);
                });

                // After filtering, update the ScrollTrigger only when sidebar exists so the sidebar pins correctly to the new blog column height
                var hasSidebar = document.querySelector('.sec-1-archive-2 .sidebar_right');
                var lastStagger = visibleCards.length ? 10 + (visibleCards.length - 1) * staggerDelayMs : 0;
                setTimeout(function () {
                    if (typeof ScrollTrigger !== 'undefined' && hasSidebar) {
                        ScrollTrigger.refresh();
                    }
                }, lastStagger + fadeDurationMs);
            });
        });
    }

    ////////////////////////////////////////////////////
    // 56. initProductDetails
    function initProductDetails() {
        var right = document.querySelector('.content-product-right');
        if (!right) return;

        // Size selection
        var sizeBtns = right.querySelectorAll('.content-product-right__size');
        sizeBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sizeBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Color selection
        var colorBtns = right.querySelectorAll('.content-product-right__color');
        colorBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                colorBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Quantity +/- 
        var qtyVal = right.querySelector('.content-product-right__qty-val, .qty-val');
        var qtyDown = right.querySelector('.qty-down');
        var qtyUp = right.querySelector('.qty-up');
        if (qtyVal && qtyDown) {
            qtyDown.addEventListener('click', function (e) {
                e.preventDefault();
                var n = parseInt(qtyVal.textContent, 10) || 1;
                if (n > 1) qtyVal.textContent = n - 1;
            });
        }
        if (qtyVal && qtyUp) {
            qtyUp.addEventListener('click', function (e) {
                e.preventDefault();
                var n = parseInt(qtyVal.textContent, 10) || 0;
                qtyVal.textContent = n + 1;
            });
        }
    }

    ////////////////////////////////////////////////////
    // 57. initShopCart (select all, quantity +/-, delete, summary)
    function initShopCart() {
        var $cartList = $('.cart-list');
        if (!$cartList.length) return;

        var $selectAll = $cartList.find('.cart-select-all');
        var $itemChecks = $cartList.find('.cart-item-check');
        var $removeSelected = $cartList.find('.cart-remove-selected');
        var $summary = $('.cart-summary');
        var appliedDiscount = 0; // amount in dollars, set when coupon applied

        // Parse price string e.g. "$64" or "$72.50" to number
        function parsePrice(str) {
            if (!str || typeof str !== 'string') return 0;
            var num = parseFloat(str.replace(/[$,]/g, '').trim(), 10);
            return isNaN(num) ? 0 : num;
        }

        // Format number as currency
        function formatMoney(num) {
            return '$' + (Math.round(num * 100) / 100).toFixed(2);
        }

        // Get estimated delivery date (e.g. 5 business days)
        function getEstimatedDeliveryDays() {
            return 5;
        }

        function formatDeliveryDate(daysFromNow) {
            var d = new Date();
            d.setDate(d.getDate() + daysFromNow);
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
        }

        function updateCartSummary() {
            if (!$summary.length) return;

            var $items = $cartList.find('.cart-item');
            var subtotal = 0;

            $items.each(function () {
                var $item = $(this);
                var price = parsePrice($item.find('.cart-item__price').text());
                var qty = parseInt($item.find('.cart-item-qty-val').text(), 10) || 1;
                subtotal += price * qty;
            });

            var discount = Math.min(appliedDiscount, subtotal);
            var tax = 0;
            var subtotalAfter = Math.max(0, subtotal - discount);
            var shipping = 0; // Free
            var total = subtotalAfter + shipping;

            $summary.find('.cart-summary__subtotal').text(formatMoney(subtotal));
            $summary.find('.cart-summary__discount').text(formatMoney(discount));
            $summary.find('.cart-summary__tax').text(formatMoney(tax));
            $summary.find('.cart-summary__subtotal-after').text(formatMoney(subtotalAfter));
            $summary.find('.cart-summary__shipping').text('Free');
            $summary.find('.cart-summary__total').text(formatMoney(total));
            $summary.find('.cart-summary__delivery-date').text(formatDeliveryDate(getEstimatedDeliveryDays()));
        }

        // Coupon apply: optional demo – set discount and update summary
        $summary.on('click', '.cart-summary__coupon-btn', function (e) {
            e.preventDefault();
            var code = $summary.find('.cart-summary__coupon-input').val().trim().toUpperCase();
            // Demo: e.g. "SAVE10" = $10 off, "SAVE20" = $20 off
            if (code === 'SAVE10') appliedDiscount = 10;
            else if (code === 'SAVE20') appliedDiscount = 20;
            else appliedDiscount = 0;
            updateCartSummary();
        });

        // Select All: check/uncheck all item checkboxes
        $selectAll.on('change', function () {
            var checked = this.checked;
            $itemChecks.prop('checked', checked);
        });

        // Item checkbox: sync "Select All" state
        $itemChecks.on('change', function () {
            var total = $itemChecks.length;
            var checked = $itemChecks.filter(':checked').length;
            $selectAll.prop('checked', total > 0 && total === checked);
        });

        // Remove selected: remove all checked items from DOM
        $removeSelected.on('click', function () {
            $cartList.find('.cart-item-check:checked').closest('.cart-item').fadeOut(300, function () {
                $(this).remove();
                updateCartSummary();
            });
        });

        // Quantity minus
        $cartList.on('click', '.cart-item-qty-minus', function (e) {
            e.preventDefault();
            var $val = $(this).siblings('.cart-item-qty-val');
            var n = parseInt($val.text(), 10) || 1;
            if (n > 1) {
                $val.text(n - 1);
                updateCartSummary();
            }
        });

        // Quantity plus
        $cartList.on('click', '.cart-item-qty-plus', function (e) {
            e.preventDefault();
            var $val = $(this).siblings('.cart-item-qty-val');
            var n = parseInt($val.text(), 10) || 0;
            $val.text(n + 1);
            updateCartSummary();
        });

        // Delete single item
        $cartList.on('click', '.cart-item-delete', function (e) {
            e.preventDefault();
            $(this).closest('.cart-item').fadeOut(300, function () {
                $(this).remove();
                updateCartSummary();
            });
        });

        // Initial summary and delivery date
        updateCartSummary();
    }

    initPortfolioFilter();
    initProductDetails();
    initShopCart();

    ////////////////////////////////////////////////////
    // 57b. Home 14 — Section 4 gallery filter
    function initSec4Home14Filter() {
        const tabsContainer = document.querySelector('.sec-4-home-14__tabs');
        if (!tabsContainer) return;

        const tabs = tabsContainer.querySelectorAll('.sec-4-home-14__tab');
        const tiles = document.querySelectorAll('.sec-4-home-14 .sec-4-home-14__tile');
        if (!tabs.length || !tiles.length) return;

        const FADE_OUT_MS = 280;
        const STAGGER_MS = 45;

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                if (this.classList.contains('is-active')) return;

                const filterValue = this.getAttribute('data-filter') || 'all';

                // Update tab states
                tabs.forEach(function (t) {
                    const active = t === tab;
                    t.classList.toggle('is-active', active);
                    t.setAttribute('aria-selected', active ? 'true' : 'false');
                });

                // Collect visible tiles
                const visibleTiles = [];
                tiles.forEach(function (tile) {
                    const cats = (tile.getAttribute('data-category') || '').split(/\s+/);
                    const isVisible = filterValue === 'all' || cats.indexOf(filterValue) !== -1;

                    if (isVisible) {
                        visibleTiles.push(tile);
                    } else {
                        tile.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
                        tile.style.opacity = '0';
                        tile.style.transform = 'translateY(-6px)';
                        setTimeout(function () {
                            tile.style.display = 'none';
                        }, FADE_OUT_MS);
                    }
                });

                // Reveal visible tiles with stagger
                visibleTiles.forEach(function (tile, index) {
                    tile.style.display = '';
                    tile.style.opacity = '0';
                    tile.style.transform = 'translateY(20px)';
                    tile.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                    setTimeout(function () {
                        tile.style.opacity = '1';
                        tile.style.transform = 'translateY(0)';
                    }, 10 + index * STAGGER_MS);
                });
            });
        });
    }

    initSec4Home14Filter();

    ////////////////////////////////////////////////////
    // 58. text-scramble
    function initTextScramble() {
        const targets = document.querySelectorAll('.text-scramble');
        if (!targets.length) return;

        const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const pickChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

        function scramble(el, finalText, duration = 1.2) {
            if (el._scrambling) return;
            el._scrambling = true;

            // Work from a text-only copy so HTML entities (e.g. &deg;) stay intact.
            const original = finalText;
            const length = original.length;

            // Build per-char queue: when to start revealing, when to end scrambling.
            const queue = [];
            for (let i = 0; i < length; i++) {
                const start = Math.floor(Math.random() * (duration * 0.4) * 60); // frames
                const end = start + Math.floor(Math.random() * (duration * 0.6) * 60) + 6;
                queue.push({ from: original[i], to: original[i], start, end, char: '' });
            }

            let frame = 0;
            const update = () => {
                let output = '';
                let complete = 0;
                for (let i = 0; i < queue.length; i++) {
                    const q = queue[i];
                    if (frame >= q.end) {
                        complete++;
                        output += q.to;
                    } else if (frame >= q.start) {
                        // Space & punctuation stay fixed so layout is stable.
                        if (/\s/.test(q.to) || q.to === ',' || q.to === '.') {
                            output += q.to;
                        } else {
                            if (!q.char || Math.random() < 0.28) {
                                q.char = pickChar();
                            }
                            output += q.char;
                        }
                    } else {
                        output += q.from;
                    }
                }
                el.textContent = output;
                if (complete === queue.length) {
                    gsap.ticker.remove(update);
                    el._scrambling = false;
                } else {
                    frame++;
                }
            };

            gsap.ticker.add(update);
        }

        targets.forEach((el) => {
            const finalText = el.dataset.scrambleText || el.textContent;
            el.dataset.scrambleText = finalText;

            // Trigger once on scroll into view.
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 90%',
                    once: true,
                    onEnter: () => scramble(el, finalText, 1.2),
                });
            } else {
                scramble(el, finalText, 1.2);
            }

            // Replay on hover for fun.
            el.addEventListener('mouseenter', () => scramble(el, finalText, 0.9));
        });
    }

    if (typeof gsap !== 'undefined') {
        initTextScramble();
    } else {
        $(window).on('load', initTextScramble);
    }

    ////////////////////////////////////////////////////
    // 59. home-9 sec-1 divider — line width 0 → 100% when scrolled into view
    function initSec1Home9DividerLines() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const dividers = document.querySelectorAll('.sec-1-home-9__divider');
        if (!dividers.length) return;

        const prefersReduced =
            window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        dividers.forEach((divider) => {
            const lines = divider.querySelectorAll('.sec-1-home-9__divider-line');
            if (!lines.length) return;

            if (prefersReduced) {
                gsap.set(lines, { width: '100%', clearProps: 'willChange' });
                return;
            }

            gsap.set(lines, { width: '0%' });
            gsap.to(lines, {
                width: '100%',
                duration: 0.85,
                ease: 'power2.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: divider,
                    start: 'top 90%',
                    once: true,
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initSec1Home9DividerLines();
    }

    ////////////////////////////////////////////////////
    // hover parallax
    // Containers with class `.at-hover-parallax` drive the first `img`
    // (or `[data-parallax-target]`) inside them in the opposite direction
    // of the cursor, creating a depth illusion.
    //
    // Optional data attributes on the container:
    //   data-parallax-strength   Max translation in px (default 15)
    //   data-parallax-scale      Scale-up factor while hovering (default 1.04)
    function initHoverParallax() {
        const containers = document.querySelectorAll('.at-hover-parallax');
        if (!containers.length || typeof gsap === 'undefined') return;

        containers.forEach((wrap) => {
            if (window.innerWidth < 992) return;

            const target =
                wrap.querySelector('[data-parallax-target]') ||
                wrap.querySelector('img') ||
                wrap.firstElementChild;
            if (!target) return;

            const strength = parseFloat(wrap.getAttribute('data-parallax-strength')) || 15;
            const scaleTo = parseFloat(wrap.getAttribute('data-parallax-scale')) || 1.04;

            const xTo = gsap.quickTo(target, 'x', { duration: 0.55, ease: 'power2.out' });
            const yTo = gsap.quickTo(target, 'y', { duration: 0.55, ease: 'power2.out' });

            wrap.addEventListener('mouseenter', () => {
                gsap.to(target, { scale: scaleTo, duration: 0.4, ease: 'power2.out' });
            });

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                // Normalise cursor position to [-1, +1] relative to container centre
                const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                xTo(nx * strength);
                yTo(ny * strength);
            });

            wrap.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
                gsap.to(target, { scale: 1, duration: 0.55, ease: 'power2.out' });
            });
        });
    }

    if (typeof gsap !== 'undefined') {
        initHoverParallax();
    } else {
        $(window).on('load', initHoverParallax);
    }

    ////////////////////////////////////////////////////
    // Footer 10 — cursor parallax on hero deco images (opposite motion for depth)
    function initFooter10HeroParallax() {
        if (typeof gsap === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const hero = document.querySelector('.footer-10__hero');
        if (!hero) return;

        const decos = hero.querySelectorAll('.footer-10__deco');
        if (!decos.length) return;

        const mq = window.matchMedia('(min-width: 768px)');
        let active = false;
        let teardown = null;

        const strength = 28;
        const yFactor = 0.58;
        const rotMax = 5;

        function disable() {
            if (teardown) {
                teardown();
                teardown = null;
            }
            decos.forEach((wrap) => {
                const img = wrap.querySelector('img');
                if (img) gsap.to(img, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: 'power2.out' });
            });
            active = false;
        }

        function enable() {
            if (active) return;
            active = true;

            const items = [...decos]
                .map((wrap) => {
                    const img = wrap.querySelector('img');
                    if (!img) return null;
                    const dir = wrap.classList.contains('footer-10__deco--left') ? 1 : -1;
                    gsap.set(img, { transformOrigin: '50% 50%' });
                    const xTo = gsap.quickTo(img, 'x', { duration: 0.7, ease: 'power3.out' });
                    const yTo = gsap.quickTo(img, 'y', { duration: 0.7, ease: 'power3.out' });
                    const rotTo = gsap.quickTo(img, 'rotation', { duration: 0.85, ease: 'power3.out' });
                    return { xTo, yTo, rotTo, dir };
                })
                .filter(Boolean);

            const onMove = (e) => {
                const rect = hero.getBoundingClientRect();
                const hw = rect.width / 2 || 1;
                const hh = rect.height / 2 || 1;
                const nx = (e.clientX - rect.left - hw) / hw;
                const ny = (e.clientY - rect.top - hh) / hh;
                items.forEach(({ xTo, yTo, rotTo, dir }) => {
                    xTo(nx * strength * dir);
                    yTo(ny * strength * yFactor * -dir);
                    rotTo(nx * rotMax * -dir * 0.45);
                });
            };

            const onLeave = () => {
                items.forEach(({ xTo, yTo, rotTo }) => {
                    xTo(0);
                    yTo(0);
                    rotTo(0);
                });
            };

            hero.addEventListener('mousemove', onMove);
            hero.addEventListener('mouseleave', onLeave);

            teardown = () => {
                hero.removeEventListener('mousemove', onMove);
                hero.removeEventListener('mouseleave', onLeave);
            };
        }

        function sync() {
            if (mq.matches) {
                enable();
            } else {
                disable();
            }
        }

        sync();
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', sync);
        } else if (typeof mq.addListener === 'function') {
            mq.addListener(sync);
        }
    }

    if (typeof gsap !== 'undefined') {
        initFooter10HeroParallax();
    } else {
        $(window).on('load', initFooter10HeroParallax);
    }

    ////////////////////////////////////////////////////
    // scroll-driven continuous rotation
    // Elements with class `.at-scroll-rotate` rotate continuously at a
    // base speed. Scrolling boosts the rotation speed, and the direction
    // of rotation follows the scroll direction. When the user stops
    // scrolling, the element eases back to its idle rotation.
    //
    // Optional data attributes:
    //   data-rotate-duration    Seconds per full rotation at idle (default 20)
    //   data-rotate-sensitivity How strongly scroll speed boosts rotation (default 0.18)
    //   data-rotate-boost       Max additional timeScale from scroll (default 12)
    function initScrollRotate() {
        const items = document.querySelectorAll('.at-scroll-rotate');
        if (!items.length || typeof gsap === 'undefined') return;

        items.forEach((el) => {
            const baseDuration = parseFloat(el.getAttribute('data-rotate-duration')) || 20;
            const sensitivity = parseFloat(el.getAttribute('data-rotate-sensitivity')) || 0.18;
            const maxBoost = parseFloat(el.getAttribute('data-rotate-boost')) || 12;

            gsap.set(el, { transformOrigin: '50% 50%' });

            const rotateTween = gsap.to(el, {
                rotation: '+=360',
                duration: baseDuration,
                ease: 'none',
                repeat: -1,
            });

            let lastScroll = window.scrollY || window.pageYOffset || 0;
            let targetTimeScale = 1;
            let currentTimeScale = 1;
            let decayTimer = null;

            const onScroll = () => {
                const now = window.scrollY || window.pageYOffset || 0;
                const delta = now - lastScroll;
                lastScroll = now;
                if (delta === 0) return;

                const boost = Math.min(Math.abs(delta) * sensitivity, maxBoost);
                targetTimeScale = delta > 0 ? 1 + boost : -(1 + boost);

                if (decayTimer) clearTimeout(decayTimer);
                decayTimer = setTimeout(() => {
                    targetTimeScale = 1;
                }, 140);
            };

            window.addEventListener('scroll', onScroll, { passive: true });

            gsap.ticker.add(() => {
                currentTimeScale += (targetTimeScale - currentTimeScale) * 0.12;
                rotateTween.timeScale(currentTimeScale);
            });
        });
    }

    if (typeof gsap !== 'undefined') {
        initScrollRotate();
    } else {
        $(window).on('load', initScrollRotate);
    }

    ////////////////////////////////////////////////////
    // 60. Home 11 sec-5 — Modern services section animations
    // Staggered card entrance + scroll parallax on images
    function initHome11Sec5Animations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const section = document.querySelector('.sec-5-home-11');
        if (!section) return;

        const cards = section.querySelectorAll('.sec-5-home-11__card');
        const mediaImages = section.querySelectorAll('.sec-5-home-11__card-media img');
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ── Staggered card entrance ──────────────────────────────
        if (cards.length && !reduceMotion) {
            gsap.set(cards, { willChange: 'transform, opacity' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            });

            tl.fromTo(
                cards,
                { y: 60, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    clearProps: 'willChange',
                },
            );
        }

        // ── Card image scroll parallax ──────────────────────────
        if (mediaImages.length && !reduceMotion) {
            mediaImages.forEach((img) => {
                const card = img.closest('.sec-5-home-11__card');
                if (!card) return;

                gsap.set(img, { willChange: 'transform' });

                gsap.fromTo(
                    img,
                    { y: '-6%', scale: 1.08 },
                    {
                        y: '6%',
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            });
        }
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initHome11Sec5Animations();
    } else {
        $(window).on('load', initHome11Sec5Animations);
    }

    ////////////////////////////////////////////////////
    // 61. Home 15 sec-1 — title-meta width follows the visible width of "Orisa Agency Portfolio"
    function initSec1Home15TitleMeta() {
        var titles = document.querySelectorAll('.sec-1-home-15__title');
        if (!titles.length) return;

        function measureTextWidth(el) {
            try {
                var range = document.createRange();
                range.selectNodeContents(el);
                var rects = range.getClientRects();
                var maxW = 0;
                for (var i = 0; i < rects.length; i++) {
                    if (rects[i].width > maxW) maxW = rects[i].width;
                }
                if (range.detach) range.detach();
                return maxW || el.getBoundingClientRect().width;
            } catch (e) {
                return el.getBoundingClientRect().width;
            }
        }

        function applyTo(title) {
            var section = title.closest('.sec-1-home-15');
            if (!section) return;
            var meta = section.querySelector('.sec-1-home-15__title-meta');
            if (!meta) return;

            meta.style.width = '';
            meta.style.marginLeft = '';
            meta.style.marginRight = '';

            var w = measureTextWidth(title);
            if (!w || !isFinite(w)) return;

            var maxW = title.parentNode ? title.parentNode.getBoundingClientRect().width : w;
            if (w > maxW) w = maxW;

            meta.style.width = Math.ceil(w) + 'px';
            meta.style.marginLeft = 'auto';
            meta.style.marginRight = 'auto';
        }

        function applyAll() {
            for (var i = 0; i < titles.length; i++) applyTo(titles[i]);
        }

        applyAll();

        if (document.fonts && typeof document.fonts.ready !== 'undefined') {
            document.fonts.ready.then(applyAll).catch(function () {});
        }

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(applyAll, 120);
        });

        if (typeof ResizeObserver !== 'undefined') {
            var ro = new ResizeObserver(function () { applyAll(); });
            for (var j = 0; j < titles.length; j++) ro.observe(titles[j]);
        }
    }

    initSec1Home15TitleMeta();
})(jQuery);
