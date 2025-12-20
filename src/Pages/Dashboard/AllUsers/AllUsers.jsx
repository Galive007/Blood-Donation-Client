import React, { useEffect, useState } from 'react';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';


const AllUsers = () => {
  const [users, setUsers] = useState([])
  const axiosSecure = useAxiosSecure()

  const fetchUser = () => {
    axiosSecure.get('/users')
      .then(res => {
        setUsers(res.data)
      })
  }

  useEffect(() => {
    fetchUser()
  }, [axiosSecure])
  // console.log(users.length);
  const handleStatusChange = (email, status) => {
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
      .then(res => {
        console.log(res.data);
        fetchUser()
      })
  }


  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <h1>Index</h1>
              </label>
            </th>
            <th>Name & Email</th>
            <th>user role</th>
            <th>user status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            users.map((user, index) => <tr key={index}>
              <th>
                <label>
                  {index + 1}
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user?.mainPhotoUrl}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                    <div className="text-sm opacity-50">{user?.email}</div>
                  </div>
                </div>
              </td>
              <td>
                {user?.role}


              </td>
              <td>{user?.status}</td>
              <th>
                {/* <button onClick={()=>handleStatusChange(user?.email,'active')} className="btn btn-ghost btn-xs">Active</button>
          <button onClick={()=>handleStatusChange(user?.email,'blocked')} className="btn btn-ghost btn-xs">Blocked</button> */}
                {
                  user?.status == 'active' ?
                    (<button onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-ghost btn-xs">Blocked</button>)

                    : <button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-ghost btn-xs">Active</button>
                }
              </th>
            </tr>)
          }

        </tbody>

      </table>
    </div>
  );
};

export default AllUsers;