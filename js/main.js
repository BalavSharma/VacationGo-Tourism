(function ($) {
    "use strict";

    // API base (defaults to same origin; fallback to localhost:4000 for Live Server)
    const defaultApiBase = (function () {
        // If already on port 4000 (backend), keep same-origin.
        if (window.location.port === '4000') return '';
        return 'http://localhost:4000';
    })();
    const API_BASE = (window.BACKEND_API_BASE || defaultApiBase).replace(/\/$/, '');

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

        // Booking form submission -> backend
        var bookingForms = Array.from(document.querySelectorAll('.js-booking-form'));

        var bookingStatusTimers = new WeakMap();

        function clearBookingStatus(form) {
            var successEl = form.querySelector('.js-booking-success');
            var errorEl = form.querySelector('.js-booking-error');
            if (successEl) successEl.classList.add('d-none');
            if (errorEl) errorEl.classList.add('d-none');
            if (bookingStatusTimers.has(form)) {
                clearTimeout(bookingStatusTimers.get(form));
                bookingStatusTimers.delete(form);
            }
        }

        function setBookingStatus(form, type, message) {
            var successEl = form.querySelector('.js-booking-success');
            var errorEl = form.querySelector('.js-booking-error');
            clearBookingStatus(form);

            var target =
                type === 'success' ? successEl :
                type === 'error' ? errorEl :
                null;

            if (target) {
                target.textContent = message || target.textContent;
                target.classList.remove('d-none');
                target.classList.add('d-block', 'text-center', 'w-100');
                var timer = window.setTimeout(function () {
                    clearBookingStatus(form);
                }, 2000);
                bookingStatusTimers.set(form, timer);
            }
        }

        function setSubmitting(form, isSubmitting) {
            var submitBtn = form.querySelector('.js-booking-submit');
            if (!submitBtn) return;
            submitBtn.disabled = isSubmitting;
            submitBtn.textContent = isSubmitting ? 'Submitting...' : 'Submit';
        }

        var dateInputs = Array.from(document.querySelectorAll('input[name="startDate"]'));

        var todayIso = new Date();
        var isoDate = todayIso.toISOString().split('T')[0];

        dateInputs.forEach(function (input) {
            input.placeholder = 'mm/dd/yyyy';
            input.min = isoDate;
            input.removeAttribute('lang');
            input.addEventListener('focus', function () {
                if (input.showPicker) {
                    input.showPicker();
                }
            });
            input.addEventListener('click', function () {
                if (input.showPicker) {
                    input.showPicker();
                }
            });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && input.showPicker) {
                    e.preventDefault();
                    input.showPicker();
                }
            });
        });

        bookingForms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                setBookingStatus(form, null);

                var formData = new FormData(form);
                var name = (formData.get('name') || '').trim();
                var contact = (formData.get('contact') || '').trim();
                var startDate = (formData.get('startDate') || '').trim();
                var pkg = (formData.get('package') || '').trim();

                if (!name || !contact || !startDate || !pkg) {
                    setBookingStatus(form, 'error', 'Please fill all fields (name, contact, date, package).');
                    return;
                }

                var isEmail = contact.includes('@');
                var email = isEmail ? contact : '';
                var phone = isEmail ? '' : contact;

                var messageParts = [];
                if (pkg) messageParts.push('Package: ' + pkg);
                if (startDate) messageParts.push('Arrival: ' + startDate);
                if (phone) messageParts.push('Phone: ' + phone);
                if (email && !isEmail) messageParts.push('Email: ' + email);

                var payload = {
                    name: name,
                    contact: contact,
                    email: email || undefined,
                    phone: phone || undefined,
                    startDate: startDate || undefined,
                    message: messageParts.length ? messageParts.join(' | ') : undefined
                };

                setSubmitting(form, true);

                fetch((API_BASE || '') + '/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                    .then(function (res) {
                        if (!res.ok) {
                            throw new Error('request_failed');
                        }
                        return res.json();
                    })
                    .then(function (body) {
                        if (body && typeof body.id !== 'undefined') {
                            form.reset();
                            setBookingStatus(form, 'success', 'Thank you! We will contact you shortly.');
                        } else {
                            throw new Error('invalid_response');
                        }
                    })
                    .catch(function (err) {
                        console.error('Booking submit failed', err);
                        setBookingStatus(form, 'error', 'Could not submit. Please try again.');
                    })
                    .finally(function () {
                        setSubmitting(form, false);
                    });
            });
        });

        // Contact form submission -> inquiries endpoint
        var contactForms = Array.from(document.querySelectorAll('.js-contact-form'));

        var contactStatusTimers = new WeakMap();

        function clearContactStatus(form) {
            var successEl = form.querySelector('.js-contact-success');
            var errorEl = form.querySelector('.js-contact-error');
            if (successEl) successEl.classList.add('d-none');
            if (errorEl) errorEl.classList.add('d-none');
            if (contactStatusTimers.has(form)) {
                clearTimeout(contactStatusTimers.get(form));
                contactStatusTimers.delete(form);
            }
        }

        function setContactStatus(form, type, message) {
            var successEl = form.querySelector('.js-contact-success');
            var errorEl = form.querySelector('.js-contact-error');
            clearContactStatus(form);

            var target =
                type === 'success' ? successEl :
                type === 'error' ? errorEl :
                null;

            if (target) {
                target.textContent = message || target.textContent;
                target.classList.remove('d-none');
                target.classList.add('d-block', 'text-center', 'w-100');
                var timer = window.setTimeout(function () {
                    clearContactStatus(form);
                }, 2000);
                contactStatusTimers.set(form, timer);
            }
        }

        function setContactSubmitting(form, isSubmitting) {
            var submitBtn = form.querySelector('.js-contact-submit');
            if (!submitBtn) return;
            submitBtn.disabled = isSubmitting;
            submitBtn.textContent = isSubmitting ? 'Sending...' : 'Send Message';
        }

        contactForms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                setContactStatus(form, null);

                var formData = new FormData(form);
                var name = (formData.get('name') || '').trim();
                var email = (formData.get('email') || '').trim();
                var subject = (formData.get('subject') || '').trim();
                var message = (formData.get('message') || '').trim();

                if (!name || !email || !message) {
                    setContactStatus(form, 'error', 'Please fill name, email, and message.');
                    return;
                }

                setContactSubmitting(form, true);

                fetch((API_BASE || '') + '/api/inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject || undefined,
                        message: message || undefined
                    })
                })
                    .then(function (res) {
                        if (!res.ok) throw new Error('request_failed');
                        return res.json();
                    })
                    .then(function (body) {
                        if (body && typeof body.id !== 'undefined') {
                            form.reset();
                            setContactStatus(form, 'success', 'Message sent! We will get back to you soon.');
                        } else {
                            throw new Error('invalid_response');
                        }
                    })
                    .catch(function (err) {
                        console.error('Contact submit failed', err);
                        setContactStatus(form, 'error', 'Could not send. Please try again.');
                    })
                    .finally(function () {
                        setContactSubmitting(form, false);
                    });
            });
        });

        // Newsletter -> WhatsApp send
        var WHATSAPP_NUMBER = '17984037';
        var whatsappButtons = Array.from(document.querySelectorAll('.js-whatsapp-send'));

        whatsappButtons.forEach(function (btn) {
            var wrapper = btn.closest('.position-relative') || btn.parentElement;
            var messageField = wrapper ? wrapper.querySelector('.newsletter-message') : null;

            btn.addEventListener('click', function () {
                var text = messageField ? (messageField.value || '').trim() : '';
                if (!text) {
                    if (messageField) {
                        messageField.focus();
                    }
                    return;
                }
                var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
                window.open(url, '_blank');
            });
        });

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
