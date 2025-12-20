import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [editable, setEditable] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get('/users/me')
      .then(res => {
        reset(res.data);
      })
      .catch(err => console.log(err));
  }, [axiosSecure, reset]);

  const onSubmit = (data) => {
    axiosSecure.patch('/users/me', data)
      .then(() => {
        Swal.fire('Success', 'Profile updated successfully', 'success');
        setEditable(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name')}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email')}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Photo</label>
          <input
            type="text"
            {...register('avatar')}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">District</label>
          <input
            type="text"
            {...register('district')}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Upazila</label>
          <input
            type="text"
            {...register('upazila')}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            {...register('blood')}
            disabled={!editable}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div className="flex gap-4">
          {!editable && (
            <button
              type="button"
              onClick={() => setEditable(true)}
              className="btn btn-primary"
            >
              Edit
            </button>
          )}
          {editable && (
            <button type="submit" className="btn btn-success">
              Save
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default Profile;
