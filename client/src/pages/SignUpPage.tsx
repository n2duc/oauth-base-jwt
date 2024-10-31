import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect } from "react";
import { register as signUp } from "../stores/auth/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetStatus } from "../stores/auth/auth.slice";
import { registerSchema, RegisterValues } from "@/libs/validation";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const { loading, error, status, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleRegister = (data: RegisterValues) => {
    dispatch(signUp(data));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (status === "resolved" && !error) {
      navigate("/signin");
      dispatch(resetStatus())
    }
  }, [navigate, status, error, dispatch, isAuthenticated]);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

export default SignUpPage