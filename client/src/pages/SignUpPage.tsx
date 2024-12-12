import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect } from "react";
import { register as signUp } from "../stores/auth/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetStatus } from "../stores/auth/auth.slice";
import { registerSchema, RegisterValues } from "@/libs/validation";
import { useForm } from "react-hook-form";
import FieldInput from "@/components/FieldInput";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import { RootState } from "@/stores/store";

const SignUpPage = () => {
  const { loading, error, status, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
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
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
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
    <div className="bg-zinc-700 py-5 px-8 rounded-md max-w-lg w-full">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
        <FieldInput>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </FieldInput>
        <FieldInput>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </FieldInput>
        <FieldInput>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </FieldInput>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Link to="/signin">Sign In</Link>
      </form>
      <GoogleButton />
    </div>
  )
}

export default SignUpPage