import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { loginSchema, LoginValues } from "@/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/stores/auth/auth.action";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { loading, isAuthenticated, error } = useAppSelector((state) => state.auth);
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
    <div>
      <h2>SignInPage</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
