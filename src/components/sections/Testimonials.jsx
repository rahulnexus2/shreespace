import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import userService from '../../api/services/userService';
 
const StarDisplay = ({ rate }) => {
  if (!rate || rate <= 0) return null;
  const capped = Math.min(rate, 5);
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= capped ? 'text-yellow-400' : 'text-neutral-300'}>
          ★
        </span>
      ))}
    </div>
  );
};
 
const Testimonials = ({ onTestimonialClick }) => {
  const { data, loading, error, execute } = useApi(userService.getActive);
 
  useEffect(() => {
    execute();
  }, []);
 
  const testimonials = data
    ? data.flatMap(user =>
        (user.messageDtos || [])
          .filter(msg => msg.messageType?.toLowerCase() === 'testimonial' && msg.isActive && msg.isApproved)
          .map(msg => ({
            ...msg,
            firstName: user.firstName,
            lastName: user.lastName,
          }))
      )
    : [];
 
  return (
    <section id="testimonials" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
 
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-3">
            Testimonials
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base mb-6">
            What our clients say about us
          </p>
          <button
  onClick={onTestimonialClick}
  className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0"
>
  ✦ Submit a Testimonial
</button>
        </div>
 
        {loading && <p className="text-center text-neutral-400">Loading...</p>}
        {error && <p className="text-center text-red-500">Error loading testimonials</p>}
 
        {!loading && testimonials.length === 0 && (
          <p className="text-center text-neutral-500">No testimonials found</p>
        )}
 
        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(item => (
              <div key={item.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
 
                <StarDisplay rate={item.rate} />
 
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 flex-1">
                  {item.text?.replace(/^"|"$/g, '')}
                </p>
 
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xs font-bold flex-shrink-0">
                    {item.firstName?.[0]}{item.lastName?.[0]}
                  </div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.firstName} {item.lastName}
                  </p>
                </div>
 
              </div>
            ))}
          </div>
        )}
 
      </div>
    </section>
  );
};
 
export default Testimonials;