import { signIn } from "next-auth/client";
import Image from "next/image";
const Login = () => {
  return (
    <div className="grid items-center place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1
        className="text-white text-center bg-blue-500 rounded-full cursor-pointer p-5"
        onClick={signIn}
      >
        Login With Facebook
      </h1>
    </div>
  );
};

export default Login;
