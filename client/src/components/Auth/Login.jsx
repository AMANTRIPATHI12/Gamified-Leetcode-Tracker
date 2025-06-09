import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CodeQuest</h1>
        <p className="mb-6 text-lg">Your gamified LeetCode journey begins now.</p>
        <button
          onClick={login}
          className="bg-lime-500 text-black px-6 py-3 rounded font-bold hover:bg-lime-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
