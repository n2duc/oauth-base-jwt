import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { loginSchema, LoginValues } from "@/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/stores/auth/auth.action";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FieldInput from "@/components/FieldInput";
import GoogleButton from "@/components/GoogleButton";
import { RootState } from "@/stores/store";

const SignInPage = () => {
  const { loading, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  const handleLogin = (data: LoginValues) => {
    dispatch(login(data));
  };

  
  return (
    <div className="bg-zinc-700 py-5 px-8 rounded-md max-w-lg w-full">
      <h2 className="text-center mb-4">SignInPage</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 w-full">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Link to="/signup">Sign Up</Link>
      </form>
      <GoogleButton />
    </div>
  );
};

export default SignInPage;
