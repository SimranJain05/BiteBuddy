// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Signup() {

//   const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

//   let navigate = useNavigate();

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();  // Synthetic event  to prevent form data from being sent if the user submits the form via pressing Enter in a field

//     const response = await fetch("http://localhost:5000/api/createuser", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
//     })

//     const json = await response.json()
//     console.log(json);

//     if (!json.success) {
//       alert("Enter valid credentials")
//     }
//     else {
//       navigate("/login");
//     }
//   }

//   const onChange = (event) => {
//     setCredentials({ ...credentials, [event.target.name]: event.target.value })
//   }
//   return (

//     <>

//       <style>
//         {`
//           body {
//             background: linear-gradient(to right, #F1916D, #F5D7DB , #BD83B8 , #473E66 , #1B3358 , #06142E)
            
//           }
//         `}
//       </style>

//       <div className="container">
//         <section className="w-100 px-4 py-5"  >
//           <div className="row d-flex justify-content-center" >
//             <div className="col-12 col-md-8 col-lg-6 col-xl-6" >
//               <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
//                 <div class="card-body p-5">

//                   <form onSubmit={handleFormSubmit}>
//                     <h2 className="text-center mb-5">Sign In</h2>
//                     <div className="mb-4">

//                       <label htmlFor="name" className="form-label "> Name  </label>
//                       <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />

//                     </div>

//                     <div className="mb-4">

//                       <label htmlFor="email" className="form-label"> Email address  </label>
//                       <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
//                       <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>

//                     </div>

//                     <div className="mb-4">

//                       <label htmlFor="password" className="form-label"> Password </label>
//                       <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />

//                     </div>

//                     <div className="mb-4">

//                       <label htmlFor="address" className="form-label"> Address </label>
//                       <input type="text" className="form-control" id="address" name="geolocation" value={credentials.geolocation} onChange={onChange} />

//                     </div>
//                     <div className="text-center">
//                       <button type="submit" className="btn btn-primary m-3"> Sign In </button>

//                       <hr />

//                       <div id="existingUser" className="form-text d-inline"> Already a user ? </div>

//                       <Link to="/login" className="m-3 btn btn-danger" aria-describedby="existingUser">Login</Link>
//                     </div>

//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>

//     </>

//   )

// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://bite-buddy-api.vercel.app/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.errors[0].msg);
    } else {
      toast.success('Signed in successfully !');
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(to right, #F1916D, #F5D7DB , #BD83B8 , #473E66 , #1B3358 , #06142E)
          }
        `}
      </style>

      <div className="container">
        <section className="w-100 px-4 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-6">
              <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5">
                  <form onSubmit={handleFormSubmit}>
                    <h2 className="text-center mb-5">Sign In</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label"> Name </label>
                      <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label"> Email address </label>
                      <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                      <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label"> Password </label>
                      <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label"> Address </label>
                      <input type="text" className="form-control" id="address" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary m-3"> Sign In </button>
                      <hr />
                      <div id="existingUser" className="form-text d-inline"> Already a user ? </div>
                      <Link to="/login" className="m-3 btn btn-danger" aria-describedby="existingUser">Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
