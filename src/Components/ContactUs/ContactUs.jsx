import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAxios } from '../../Hooks/useAxios';
import MyContainer from '../MyContainer';

const ContactUs = () => {
  const axiosinstance = useAxios()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // 🔹 send data to backend
      await axiosinstance.post('/contact', data);

      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Failed to send message!');
    }
  };

  return (
    <section className="py-16">
      <MyContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-red-600">
              Contact Us
            </h2>
            <p className="mb-6">
              Have questions or need help? Reach out to us anytime.
            </p>

            <div className="space-y-4">
              <p><strong>📞 Phone:</strong> +880 1768 509 351</p>
              <p><strong>📧 Email:</strong> support@blooddonation.com</p>
              <p><strong>📍 Address:</strong> Khulna, Bangladesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-6 rounded-lg space-y-4"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                rows="4"
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                })}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn bg-red-600 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </MyContainer>
    </section>
  );
};

export default ContactUs;
