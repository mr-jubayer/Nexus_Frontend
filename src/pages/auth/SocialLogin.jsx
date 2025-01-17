/* eslint-disable react/prop-types */
import { FcGoogle } from "react-icons/fc";
import FilledBtn from "../../components/buttons/FilledBtn";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function SocialLogin({ label }) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handleSocialLogin = async () => {
    const res = await googleLogin();
    const user = {
      email: res.user.email,
      fullName: res.user.displayName,
      profilePhoto: res?.user?.photoURL,
    };

    await axiosSecure.post("/api/users", user);

    navigate("/");
    toast.success("Login Successfull!");
  };
  return (
    <div className="flex justify-center">
      <FilledBtn
        onClick={handleSocialLogin}
        className="border-2 border-myGreen  sm:w-8/12 w-10/12 mx-auto"
      >
        <p className="flex items-center gap-3 sm:text-lg text-base">
          <span className="p-0.5 bg-white rounded-md">
            {" "}
            <FcGoogle className="text-2xl" />
          </span>{" "}
          Sign {label} with Google
        </p>
      </FilledBtn>
    </div>
  );
}

export default SocialLogin;
