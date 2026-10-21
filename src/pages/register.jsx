// Register.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/userSlice";
import BrandLogo from "../components/BrandLogo";

const Register = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsRegistered(false);

        const result = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(result)) {
            setIsRegistered(true);
            setFormData({
                name: "",
                email: "",
                password: ""
            });
        }
    };

    return (
        <main className="min-h-[calc(100vh-78px)] bg-[#f6f4ee] px-4 py-10 sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#e5e4dc] bg-white shadow-[0_24px_80px_rgba(38,60,45,0.1)] lg:min-h-[680px] lg:grid-cols-[1fr_0.9fr]">
                <section className="relative isolate flex min-h-64 flex-col justify-between overflow-hidden bg-[#263c2d] p-8 text-white sm:p-12 lg:p-14">
                    <div aria-hidden="true" className="absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full border border-white/10" />
                    <div aria-hidden="true" className="absolute -right-8 -top-4 -z-10 h-48 w-48 rounded-full border border-white/10" />
                    <div aria-hidden="true" className="absolute -bottom-36 -left-24 -z-10 h-96 w-96 rounded-full bg-[#71836e]/30 blur-2xl" />

                    <BrandLogo className="auth-brand" showTagline={false} />

                    <div className="relative z-10 mt-12 lg:mt-0">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#c7d2bf]">
                            Find your everyday
                        </p>
                        <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                            A little more
                            <span className="block font-serif italic text-[#c7d2bf]">you, every day.</span>
                        </h1>
                        <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                            Create an account to save your favourites and make your next thoughtful find yours.
                        </p>
                    </div>

                    <p className="mt-12 text-xs tracking-wide text-white/55 lg:mt-0">
                        Everything you need, in one place.
                    </p>
                </section>

                <section className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#71836e]">
                                Join the collection
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight text-[#263c2d] sm:text-4xl">
                                Create account
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#697067]">
                                It only takes a moment to get started.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="register-name" className="mb-2 block text-sm font-semibold text-[#354439]">
                                    Full name
                                </label>
                                <input
                                    id="register-name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="min-h-12 w-full rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-4 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10"
                                />
                            </div>

                            <div>
                                <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-[#354439]">
                                    Email address
                                </label>
                                <input
                                    id="register-email"
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
                                <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-[#354439]">
                                    Password
                                </label>
                                <input
                                    id="register-password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="min-h-12 w-full rounded-xl border border-[#dfe3da] bg-[#fbfcf9] px-4 text-sm text-[#263c2d] outline-none transition placeholder:text-[#a0a69d] focus:border-[#71836e] focus:bg-white focus:ring-4 focus:ring-[#71836e]/10"
                                />
                            </div>

                            {error && (
                                <p role="alert" className="rounded-xl border border-[#e8c8c1] bg-[#fff7f5] px-4 py-3 text-sm text-[#8e473e]">
                                    {typeof error === "string" ? error : error.message || "Unable to create your account. Please try again."}
                                </p>
                            )}
                            {isRegistered && !error && (
                                <p role="status" className="rounded-xl border border-[#cbd6c5] bg-[#f1f5ee] px-4 py-3 text-sm text-[#3c6045]">
                                    Account created successfully! Please log in.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#263c2d] px-5 text-sm font-semibold text-white transition hover:bg-[#3b5843] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263c2d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}
                                {!loading && <span aria-hidden="true">→</span>}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#697067]">
                            Already have an account?
                            <Link to="/login" className="ml-1 font-semibold text-[#3c6045] underline decoration-[#b9c6b5] underline-offset-4 hover:text-[#263c2d]">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Register;