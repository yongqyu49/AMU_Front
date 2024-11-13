import Layout from "../Layout";

const SignIn = () => {
    const doSignIn = (e) => {
        e.preventDefault();
        console.log("login");
    }
    return (
        <div>
            <form onSubmit={doSignIn}>
                <input type={"text"} placeholder={"id"} />
                <input type={"password"} placeholder={"password"} />
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}

export default SignIn;