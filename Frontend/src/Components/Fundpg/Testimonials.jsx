import React, { useEffect, useState } from 'react';
import { useTestimonialStore } from '../../store/testimonial';
import { CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const { testimonials, fetchTestimonials, createTestimonial, deleteTestimonial, updateTestimonial } = useTestimonialStore();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };


  return (
    <div>
      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          What Our Supporters Say
        </h2>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: "", type: "success" })}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {testimonial.description}
              </p>
              <p className="font-semibold">- {testimonial.name}</p>
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;