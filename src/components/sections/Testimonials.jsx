{/*import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import messageService from '../../api/services/messageService';

const Testimonials = () => {
  const { data, loading, error, execute } = useApi(messageService.getActive);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
  if (data) console.log(data);
  }, [data]);

  
  const testimonials = data
    ? data.filter(item => item.messageType?.toLowerCase() === 'testimonial')
    : [];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Testimonials
        </h2>

        
        {loading && <p>Loading...</p>}

        
        {error && <p>Error loading testimonials</p>}

        
        {!loading && testimonials.length === 0 && (
          <p className="text-center">No testimonials found</p>
        )}

     
        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(item => (
  <div
    key={item.id}
    className="border rounded-xl p-6 shadow"
  >
    <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
      {item.messageType}
    </span>

   
    <p className="text-sm my-4">
      {item.text.replace(/^"|"$/g, "")}
    </p>

   
    <p className="text-xs text-gray-500">
      ID: {item.id}
    </p>
  </div>
))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;

*/}

import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import messageService from '../../api/services/messageService';

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

const Testimonials = () => {
  const { data, loading, error, execute } = useApi(messageService.getActive);

  useEffect(() => {
    execute();
  }, []);

 useEffect(() => {
  if (data) {
    console.log('testimonials:', JSON.stringify(data.filter(i => i.messageType?.toLowerCase() === 'testimonial'), null, 2));
  }
}, [data]);

  const testimonials = data
    ? data.filter(item => item.messageType?.toLowerCase() === 'testimonial')
    : [];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-10 text-center">Testimonials</h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error loading testimonials</p>}

        {!loading && testimonials.length === 0 && (
          <p className="text-center text-neutral-500">No testimonials found</p>
        )}

        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(item => (
              <div key={item.id} className="border rounded-xl p-6 shadow dark:border-neutral-700 flex flex-col">

                {/* star rating */}
                <StarDisplay rate={item.rate} />

                {/* message */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 flex-1">
                  {item.text.replace(/^"|"$/g, '')}
                </p>

                {/* user */}
                {item.userDto ? (
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xs font-bold">
                      {item.userDto.firstName?.[0]}{item.userDto.lastName?.[0]}
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {item.userDto.firstName} {item.userDto.lastName}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 mt-auto">Anonymous</p>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;