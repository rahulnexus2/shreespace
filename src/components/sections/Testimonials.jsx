import { useEffect, useRef, useState } from 'react';
import useApi from '../../hooks/useApi';
import userService from '../../api/services/userService';
import { useModal } from '../../context/ModalContext';

const StarDisplay = ({ rate }) => {
  if (rate === null || rate === undefined) return null;
  const capped = Math.min(rate, 5);
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= capped ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}>
          ★
        </span>
      ))}
    </div>
  );
};

const TestimonialCard = ({ item }) => (
  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-72 md:w-80">
    <StarDisplay rate={item.rate} />
    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 flex-1">
      {item.text?.replace(/^"|"$/g, '')}
    </p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
      <div className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xs font-bold flex-shrink-0">
        {item.firstName?.[0]?.toUpperCase()}{item.lastName?.[0]?.toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
          {item.firstName} {item.lastName}
        </p>
        {item.email && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{item.email}</p>
        )}
      </div>
    </div>
  </div>
);

const Testimonials = ({ onTestimonialClick }) => {
  const { openModal } = useModal();
  const { data: users, loading, error, execute: fetchUsers } = useApi(userService.getActive);

  const [showAll, setShowAll] = useState(false);
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const testimonials = users
    ? users.flatMap(user =>
        (user.messageDtos ?? [])
          .filter(msg =>
            msg.isActive !== false &&
            msg.isApproved !== false
          )
          .map(msg => ({
            ...msg,
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            email: user.email ?? '',
          }))
      )
    : [];

  const INITIAL_COUNT = 10;
  const visibleInCarousel = testimonials.slice(0, INITIAL_COUNT);
  const hasMore = testimonials.length > INITIAL_COUNT;

  const updateScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [testimonials, showAll]);

  return (
    <section id="testimonials" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-3">
            Testimonials
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base mb-6">
            What our clients say about us
          </p>
          <button
             onClick={() => openModal('Testimonial')}  
            className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
          >
            ✦ Submit a Testimonial
          </button>
        </div>

        {/* States */}
        {loading && <p className="text-center text-neutral-400">Loading...</p>}
        {error && <p className="text-center text-red-500">Error loading testimonials.</p>}
        {!loading && !error && testimonials.length === 0 && (
          <p className="text-center text-neutral-500 dark:text-neutral-400">No testimonials yet.</p>
        )}

        {/* Content */}
        {!loading && !error && testimonials.length > 0 && (
          <>
            {!showAll ? (
              <div className="relative">
                {canScrollLeft && (
                  <button
                    onClick={() => scroll(-1)}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
                  >
                    ‹
                  </button>
                )}

                <div
                  ref={trackRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onScroll={updateScrollButtons}
                >
                  {visibleInCarousel.map(item => (
                    <TestimonialCard key={item.id} item={item} />
                  ))}
                </div>

                {canScrollRight && (
                  <button
                    onClick={() => scroll(1)}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
                  >
                    ›
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map(item => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="px-6 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  {showAll ? 'Show less' : `See all ${testimonials.length} testimonials`}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default Testimonials;