import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useRegister } from "./hooks";
import { toast } from "react-toastify";

interface FormState {
     userName: string;
     userNameError: string;
     email: string;
     password: string;
     confirmPassword: string;
     emailError: string;
     passwordError: string;
     confirmPasswordError: string;
     loading: boolean;
     [key: string]: string | boolean;
}

export const Register = () => {
     const navigate = useNavigate();
     const register = useRegister();

     const [formState, setFormState] = useState<FormState>({
          email: "",
          password: "",
          confirmPassword: "",
          emailError: "",
          passwordError: "",
          confirmPasswordError: "",
          userName: "",
          userNameError: "",
          loading: false,
     });

     // Destructure values from formState for easier access
     const {
          email,
          password,
          confirmPassword,
          userName,
          phoneNumber,
          emailError,
          passwordError,
          confirmPasswordError,
          phoneNumberError,
          loading,
     } = formState;

     // Regular expression for email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormState((prevState) => ({
               ...prevState,
               [name]: value,
               formError: "",
          }));
     };

     const handleSubmit = async (e: FormEvent) => {
          e.preventDefault();

          // Perform validation
          if (!userName) {
               setFormState((prevState) => ({
                    ...prevState,
                    userNameError: "User name is required",
                    formError: "",
               }));
          } else if (userName === "") {
               setFormState((prevState) => ({
                    ...prevState,
                    userNameError: "User name Feild is Required",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    userNameError: "",
                    formError: "",
               }));
          }

          if (!email) {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "Email is required",
                    formError: "",
               }));
          } else if (!emailRegex.test(email)) {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "Invalid email format",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "",
                    formError: "",
               }));
          }

          if (!password) {
               setFormState((prevState) => ({
                    ...prevState,
                    passwordError: "Password is required",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    passwordError: "",
                    formError: "",
               }));
          }

          if (password !== confirmPassword) {
               setFormState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: "Passwords do not match",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: "",
                    formError: "",
               }));
          }

          // If all fields are valid, proceed with sign up logic
          if (email && password && confirmPassword && password === confirmPassword) {
               setFormState((prevState) => ({
                    ...prevState,
                    loading: true,
                    formError: "",
               }));

               await register(
                    {
                         email,
                         password,
                         userName,
                         roleId: 1,
                    },
                    () => {
                         setFormState((prevState) => ({
                              ...prevState,
                              loading: false,
                              formError: "",
                         }));
                         toast.success("successfully created an account");
                         navigate("/auth/login");
                    },
                    (formError) => {
                         setFormState((prevState) => ({
                              ...prevState,
                              loading: false,
                              formError,
                         }));
                         toast.error(formError);
                    },
               );
          }
     };

     return (
          <>
               <div className="auth-container d-flex">
                    <div className="container mx-auto align-self-center">
                         <div className="row">
                              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                                   <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                             <div className="row">
                                                  <div className="col-md-12 mb-3">
                                                       <h2>Sign up</h2>
                                                       <p>Enter your email and password to login</p>
                                                  </div>
                                                  <div
                                                       style={{
                                                            color: "red",
                                                            width: "100%",
                                                       }}
                                                  >
                                                       {formState?.formError}
                                                  </div>
                                                  <div className="col-md-12">
                                                       <div className="mb-3">
                                                            <label className="form-label">
                                                                 User Name
                                                            </label>
                                                            <input
                                                                 type="text"
                                                                 name="userName"
                                                                 className="form-control"
                                                                 value={
                                                                      formState[
                                                                           "userName"
                                                                      ] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                            <div
                                                                 style={{
                                                                      color: "red",
                                                                      width: "100%",
                                                                 }}
                                                            >
                                                                 {formState?.userNameError}
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-md-12">
                                                       <div className="mb-3">
                                                            <label className="form-label">
                                                                 Email
                                                            </label>
                                                            <input
                                                                 type="email"
                                                                 className="form-control"
                                                                 name="email"
                                                                 value={
                                                                      formState["email"] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                            <div
                                                                 style={{
                                                                      color: "red",
                                                                      width: "100%",
                                                                 }}
                                                            >
                                                                 {formState?.emailError}
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-12">
                                                       <div className="mb-4">
                                                            <label className="form-label">
                                                                 Password
                                                            </label>
                                                            <input
                                                                 type="password"
                                                                 className="form-control"
                                                                 name="password"
                                                                 value={
                                                                      formState[
                                                                           "password"
                                                                      ] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                            <div
                                                                 style={{
                                                                      color: "red",
                                                                      width: "100%",
                                                                 }}
                                                            >
                                                                 {formState?.passwordError}
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-12">
                                                       <div className="mb-4">
                                                            <label className="form-label">
                                                                 Comfirm Password
                                                            </label>
                                                            <input
                                                                 type="password"
                                                                 className="form-control"
                                                                 name="confirmPassword"
                                                                 value={
                                                                      formState[
                                                                           "confirmPassword"
                                                                      ] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                            <div
                                                                 style={{
                                                                      color: "red",
                                                                      width: "100%",
                                                                 }}
                                                            >
                                                                 {formState?.confirmPasswordError}
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-12">
                                                       <div className="mb-3">
                                                            <div className="form-check form-check-primary form-check-inline me-3">
                                                                 {" "}
                                                                 <label
                                                                      className="form-check-label me-3"
                                                                      style={{
                                                                           marginLeft: -18,
                                                                           fontSize: 14,
                                                                      }}
                                                                 >
                                                                      Already have an account?
                                                                      <a
                                                                           style={{
                                                                                color: "blue",
                                                                                marginLeft: 4,
                                                                                cursor: "pointer",
                                                                           }}
                                                                           href="/auth/login"
                                                                      >
                                                                           Sign in
                                                                      </a>
                                                                 </label>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="mb-3">
                                                            <div className="form-check form-check-primary form-check-inline">
                                                                 <input
                                                                      className="form-check-input me-3"
                                                                      type="checkbox"
                                                                      id="form-check-default"
                                                                 />
                                                                 <label
                                                                      className="form-check-label"
                                                                      htmlFor="form-check-default"
                                                                 >
                                                                      Remember me
                                                                 </label>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-12">
                                                       <div className="mb-4">
                                                            <button
                                                                 onClick={handleSubmit}
                                                                 className="btn btn-secondary w-100"
                                                            >
                                                                 {loading ? <Spinner /> : "SIGN UP"}
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};
