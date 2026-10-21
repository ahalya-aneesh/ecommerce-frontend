import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";
import BrandLogo from "../components/BrandLogo";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(loginUser(formData));

        if (loginUser.fulfilled.match(result)) {
            navigate(result.payload.role === "admin" ? "/admin/dashboard" : "/");
            setFormData({
                email: "",
                password: ""
            });
        }
    };

    return (
        <main className="min-h-[calc(100vh-78px)] bg-[#f6f4ee] px-4 py-10 sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#e5e4dc] bg-white shadow-[0_24px_80px_rgba(38,60,45,0.1)] lg:min-h-[640px] lg:grid-cols-[1fr_0.9fr]">
                <section className="relative isolate flex min-h-64 flex-col justify-between overflow-hidden bg-[#263c2d] p-8 text-white sm:p-12 lg:p-14">
                    <div aria-hidden="true" className="absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full border border-white/10" />
                    <div aria-hidden="true" className="absolute -right-8 -top-4 -z-10 h-48 w-48 rounded-full border border-white/10" />
                    <div aria-hidden="true" className="absolute -bottom-36 -left-24 -z-10 h-96 w-96 rounded-full bg-[#71836e]/30 blur-2xl" />

                    <BrandLogo className="auth-brand" showTagline={false} />

                    <div className="relative z-10 mt-12 lg:mt-0">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#c7d2bf]">
                            Welcome back
                        </p>
                        <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                            Good finds are
                            <span className="block font-serif italic text-[#c7d2bf]">better together.</span>
                        </h1>
                        <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                            Sign in to revisit your favourites and find something lovely for everyday living.
                        </p>
                    </div>

                    <p className="mt-12 text-xs tracking-wide text-white/55 lg:mt-0">
                        Everything you need, in one place.
                    </p>
                </section>

                <section className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-9">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#71836e]">
                                Your account
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight text-[#263c2d] sm:text-4xl">
                                Sign in
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#697067]">
                                Enter your details below to continue shopping.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-[#354439]">
                                    Email address
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="min-h-12 w-full rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-4 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10"
                                />
                            </div>

                            <div>
                                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-[#354439]">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="min-h-12 w-full rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-4 pr-20 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((visible) => !visible)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute inset-y-0 right-3 my-auto rounded px-2 text-xs font-semibold text-[#526c55] hover:text-[#263c2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d]"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p role="alert" className="rounded-xl border border-[#e8c8c1] bg-[#fff7f5] px-4 py-3 text-sm text-[#8e473e]">
                                    {typeof error === "string" ? error : error.message || "Unable to sign in. Please try again."}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#263c2d] px-5 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <span aria-hidden="true">→</span>}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#697067]">
                            New to Kairo?
                            <Link to="/register" className="ml-1 font-semibold text-[#3c6045] underline decoration-[#b9c6b5] underline-offset-4 hover:text-[#263c2d]">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;