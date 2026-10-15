// Register.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/userSlice";
import "./Register.css";

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
        <div className="register-page">
            <div className="register-card">

                <div className="logo">
                    🎓
                </div>

                <h1>Create Account</h1>
                <p className="subtitle">
                    Join our Student Portal today
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    {error && (
                        <p className="error">{error}</p>
                    )}
                    {isRegistered && !error && (
                        <p className="success">Account created successfully! Please log in.</p>
                    )}

                </form>

                <p className="login-text">
                    Already have an account?
                    <Link to="/login">Log in</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;