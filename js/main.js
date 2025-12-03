(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    // Typewriter loop for About stats (shared timeline)
    document.addEventListener('DOMContentLoaded', function () {
        var searchParams = new URLSearchParams(window.location.search);
        var typeTargets = Array.from(document.querySelectorAll('.js-typewrite')).map(function (el) {
            return {
                el: el,
                text: el.dataset.text || el.textContent.trim()
            };
        });

        if (typeTargets.length) {
            var maxLen = Math.max.apply(null, typeTargets.map(function (item) { return item.text.length; }));
            var speed = Number(typeTargets[0].el.dataset.speed) || 80;
            var pause = Number(typeTargets[0].el.dataset.pause) || 1200;
            var delay = Number(typeTargets[0].el.dataset.delay) || 0;

            typeTargets.forEach(function (item) {
                item.el.textContent = '';
            });

            function render(count) {
                typeTargets.forEach(function (item) {
                    var targetCount = Math.min(count, item.text.length);
                    item.el.textContent = item.text.slice(0, targetCount);
                });
            }

            function typeForward(count) {
                render(count);
                if (count < maxLen) {
                    setTimeout(function () { typeForward(count + 1); }, speed);
                } else {
                    setTimeout(function () { typeBackward(maxLen); }, pause);
                }
            }

            function typeBackward(count) {
                render(count);
                if (count > 0) {
                    setTimeout(function () { typeBackward(count - 1); }, Math.max(40, speed / 2));
                } else {
                    setTimeout(function () { typeForward(0); }, pause);
                }
            }

            setTimeout(function () {
                typeForward(0);
            }, delay);
        }

        var overlay = document.getElementById('destinationOverlay');
        var cardsWrapper = document.getElementById('destinationCards');
        var viewButtons = Array.from(document.querySelectorAll('.destination-view-btn'));

        if (overlay && viewButtons.length) {
            var overlaySets = Array.from(overlay.querySelectorAll('[data-overlay-set]'));
            var overlaySlides = [];
            var prevBtn = overlay.querySelector('.overlay-prev');
            var nextBtn = overlay.querySelector('.overlay-next');
            var closeBtn = overlay.querySelector('.overlay-close');
            var currentIndex = 0;

            function setActiveSet(targetKey) {
                var activeSet = overlaySets.find(function (set) {
                    return set.dataset.overlaySet === targetKey;
                }) || overlaySets[0];

                overlaySets.forEach(function (setEl) {
                    var isActive = setEl === activeSet;
                    setEl.classList.toggle('is-active', isActive);
                    setEl.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                });

                overlaySlides = activeSet ? Array.from(activeSet.querySelectorAll('.overlay-slide')) : [];
            }

            function setActiveSlide(index) {
                if (!overlaySlides.length) return;
                var total = overlaySlides.length;
                currentIndex = (index + total) % total;
                overlaySlides.forEach(function (slide, idx) {
                    var isActive = idx === currentIndex;
                    slide.classList.toggle('is-active', isActive);
                    slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                });
            }

            function openOverlayForKey(targetKey) {
                setActiveSet(targetKey);
                if (!overlaySlides.length) {
                    return;
                }
                setActiveSlide(0);
                overlay.classList.add('show');
                overlay.setAttribute('aria-hidden', 'false');
                if (cardsWrapper) {
                    cardsWrapper.classList.add('is-blurred');
                }
            }

            function closeOverlay() {
                overlay.classList.remove('show');
                overlay.setAttribute('aria-hidden', 'true');
                if (cardsWrapper) {
                    cardsWrapper.classList.remove('is-blurred');
                }
            }

            viewButtons.forEach(function (btn) {
                btn.addEventListener('click', function (event) {
                    event.preventDefault();
                    var targetKey = btn.dataset.overlayTarget || '';
                    openOverlayForKey(targetKey);
                });
            });

            if (prevBtn) {
                prevBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    setActiveSlide(currentIndex - 1);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    setActiveSlide(currentIndex + 1);
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    closeOverlay();
                });
            }

            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    closeOverlay();
                    return;
                }

                var nestedViewBtn = event.target.closest('.destination-view-btn');
                if (nestedViewBtn) {
                    event.preventDefault();
                }
            });

            document.addEventListener('keyup', function (event) {
                if (!overlay.classList.contains('show')) {
                    return;
                }

                if (event.key === 'Escape') {
                    closeOverlay();
                } else if (event.key === 'ArrowRight') {
                    setActiveSlide(currentIndex + 1);
                } else if (event.key === 'ArrowLeft') {
                    setActiveSlide(currentIndex - 1);
                }
            });
        }

        var cardsContainer = document.getElementById('destinationCards');
        var viewMoreBtn = document.getElementById('destinationViewMore');
        var viewLessBtn = document.getElementById('destinationViewLess');

        if (cardsContainer) {
            var hiddenCards = Array.from(cardsContainer.querySelectorAll('.destination-card.is-hidden'));

            function showHiddenCards() {
                hiddenCards.forEach(function (card) {
                    card.classList.remove('is-hidden', 'd-none');
                    card.removeAttribute('aria-hidden');
                });
                if (viewMoreBtn) {
                    viewMoreBtn.classList.add('d-none');
                }
                if (viewLessBtn) {
                    viewLessBtn.classList.remove('d-none');
                    viewLessBtn.removeAttribute('aria-hidden');
                }
            }

            function hideHiddenCards() {
                hiddenCards.forEach(function (card) {
                    card.classList.add('is-hidden', 'd-none');
                    card.setAttribute('aria-hidden', 'true');
                });
                if (viewLessBtn) {
                    viewLessBtn.classList.add('d-none');
                    viewLessBtn.setAttribute('aria-hidden', 'true');
                }
                if (viewMoreBtn) {
                    viewMoreBtn.classList.remove('d-none');
                    viewMoreBtn.removeAttribute('aria-hidden');
                }
            }

            if (viewMoreBtn) {
                viewMoreBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    showHiddenCards();
                });
            }

            if (viewLessBtn) {
                viewLessBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                    hideHiddenCards();
                });
            }
        }

        var packageContainer = document.getElementById('packageCards');
        var packageViewMore = document.getElementById('packageViewMore');
        var packageViewLess = document.getElementById('packageViewLess');

        if (packageContainer) {
            var hiddenPackages = Array.from(packageContainer.querySelectorAll('.package-card.is-hidden'));

            function showHiddenPackages() {
                hiddenPackages.forEach(function (card) {
                    card.classList.remove('is-hidden', 'd-none');
                    card.removeAttribute('aria-hidden');
                });

                if (packageViewMore) {
                    packageViewMore.classList.add('d-none');
                }

                if (packageViewLess) {
                    packageViewLess.classList.remove('d-none');
                    packageViewLess.removeAttribute('aria-hidden');
                }
            }

            function hideHiddenPackages() {
                hiddenPackages.forEach(function (card) {
                    card.classList.add('is-hidden', 'd-none');
                    card.setAttribute('aria-hidden', 'true');
                });

                if (packageViewLess) {
                    packageViewLess.classList.add('d-none');
                    packageViewLess.setAttribute('aria-hidden', 'true');
                }

                if (packageViewMore) {
                    packageViewMore.classList.remove('d-none');
                    packageViewMore.removeAttribute('aria-hidden');
                }
            }

            if (packageViewMore) {
                packageViewMore.addEventListener('click', function (event) {
                    event.preventDefault();
                    showHiddenPackages();
                });
            }

            if (packageViewLess) {
                packageViewLess.addEventListener('click', function (event) {
                    event.preventDefault();
                    hideHiddenPackages();
                });
            }
        }

        var filterGroups = Array.from(document.querySelectorAll('.package-filter-controls[data-package-target]'));

        filterGroups.forEach(function (group) {
            var targetId = group.getAttribute('data-package-target');
            var cardsWrapper = document.getElementById(targetId);

            if (!cardsWrapper) {
                return;
            }

            var buttons = Array.from(group.querySelectorAll('.package-filter-btn'));

            if (!buttons.length) {
                return;
            }

            var cards = Array.from(cardsWrapper.querySelectorAll('[data-package-key]'));

            function filterPackages(key) {
                cards.forEach(function (card) {
                    var match = key === 'all' || card.dataset.packageKey === key;
                    card.classList.toggle('d-none', !match);
                    card.classList.toggle('is-hidden', !match);
                    card.setAttribute('aria-hidden', (!match).toString());
                });
            }

            function updateButtons(activeButton) {
                buttons.forEach(function (btn) {
                    var isActive = btn === activeButton;
                    btn.classList.toggle('btn-primary', isActive);
                    btn.classList.toggle('btn-outline-primary', !isActive);
                    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                });
            }

            buttons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var key = btn.dataset.packageKey || 'all';
                    filterPackages(key);
                    updateButtons(btn);
                });
            });

            var defaultButton = buttons.find(function (btn) {
                return btn.dataset.packageKey === 'all';
            }) || buttons[0];

            var requestedPackageKey = searchParams.get('package');
            if (requestedPackageKey) {
                var requestedButton = buttons.find(function (btn) {
                    return (btn.dataset.packageKey || '') === requestedPackageKey;
                });
                if (requestedButton) {
                    filterPackages(requestedButton.dataset.packageKey || 'all');
                    updateButtons(requestedButton);
                    return;
                }
            }

            if (defaultButton) {
                filterPackages(defaultButton.dataset.packageKey || 'all');
                updateButtons(defaultButton);
            }
        });

        var bookingSection = document.getElementById('bookingSection');
        var bookingCard = bookingSection ? bookingSection.querySelector('.booking-card') : null;
        var bookingLinks = Array.from(document.querySelectorAll('.js-booking-link'));
        var bookingHighlightTimeout;

        if (bookingSection && bookingLinks.length) {
            function highlightBookingCard() {
                if (!bookingCard) {
                    return;
                }
                bookingCard.classList.remove('is-highlighted');
                void bookingCard.offsetWidth; // restart animation on repeated clicks
                bookingCard.classList.add('is-highlighted');

                if (bookingHighlightTimeout) {
                    clearTimeout(bookingHighlightTimeout);
                }
                bookingHighlightTimeout = window.setTimeout(function () {
                    bookingCard.classList.remove('is-highlighted');
                }, 2000);
            }

            function scrollToBooking(event) {
                event.preventDefault();
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (history.replaceState) {
                    history.replaceState(null, '', '#bookingSection');
                }
                highlightBookingCard();
            }

            bookingLinks.forEach(function (btn) {
                btn.addEventListener('click', scrollToBooking);
            });

            if (window.location.hash === '#bookingSection') {
                highlightBookingCard();
            }
        }

        var quotePackageSelect = document.getElementById('selectPackage');
        if (quotePackageSelect) {
            var requestedQuotePackage = searchParams.get('package');
            if (requestedQuotePackage) {
                var matchedOption = Array.from(quotePackageSelect.options).find(function (option) {
                    return option.value === requestedQuotePackage;
                });
                if (matchedOption) {
                    quotePackageSelect.value = requestedQuotePackage;
                }
            }
        }

    });

})(jQuery);
