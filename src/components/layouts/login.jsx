import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";
const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContaindigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length;
    };
    const isValid = Object.keys(errors).length;
    useEffect(() => {
        validate();
    }, [data]);

    const { email, password } = data;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isNonValid = validate();
        if (isNonValid) return;
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
