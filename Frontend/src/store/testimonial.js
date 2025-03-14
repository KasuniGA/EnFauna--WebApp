import { create } from "zustand";

export const useTestimonialStore = create((set) => ({
  testimonials: [],
  setTestimonials: (testimonials) => set({ testimonials }),
  createTestimonial: async (newTestimonial) => {
    if (!newTestimonial.name || !newTestimonial.description) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/testimonialS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTestimonial),
    });
    const data = await res.json();
    set((state) => ({ testimonials: [...state.testimonials, data.data] }));
    return { success: true, message: "Testimonial created successfully" };
  },
  fetchTestimonials: async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    set({ testimonials: data.data });
  },
  deleteTestimonial: async (tid) => {
    const res = await fetch(`/api/testimonials/${tid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      testimonials: state.testimonials.filter(
        (testimonial) => testimonial._id !== tid
      ),
    }));
    return { success: true, message: data.message };
  },

  updateTestimonial: async (tid, updatedTestimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${tid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTestimonial),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the new testimonials data
      set((state) => ({
        testimonials: state.testimonials.map((testimonial) =>
          testimonial._id === tid
            ? { ...testimonial, ...updatedTestimonial }
            : testimonial
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error updating donation" };
    }
  },
}));
