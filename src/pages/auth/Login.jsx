import { Link, useLocation, useNavigate } from "react-router";
import FilledBtn from "../../components/buttons/FilledBtn";
import InputBox from "../../components/inputs/InputBox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signInWithEmailAndPass } = useAuth();
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (userCredetial) => {
    const { password, email } = userCredetial;
    setLoading(true);
    setFirebaseErr("");
    try {
      await signInWithEmailAndPass(email, password);
      reset();
      navigate(location?.state?.from || "/");
      toast.success("Login Successfull!");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setFirebaseErr("The email address is already in use!");
          break;
        case "auth/invalid-credential":
          setFirebaseErr("The credetial is invalid.");
          break;
        case "auth/weak-password":
          setFirebaseErr("The password is too weak.");
          break;
        default:
          setFirebaseErr("An error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[450px]">
      <div className=" border sm:border-black border-black/30 px-8 py-16 my-7">
        <div className="flex justify-center flex-col items-center mb-4">
          <h2 className="text-3xl text-myGreen">Login</h2>
          <p className="mt-1 text-lg">
            To continue to <span className="font-bold ">Nexus</span>
          </p>
        </div>
        {/* social login */}
        <SocialLogin label={"in"} />
        <div className="divider">OR</div>
        {/* email and pass login */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-2"
        >
          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            id={"email"}
            required={true}
            register={{ ...register("email") }}
          />
          <p className="text-sm text-error mt-1">{firebaseErr} </p>
          <InputBox
            label={"Password"}
            name={"password"}
            type={isVisible ? "text " : "password"}
            id={"password"}
            required={true}
            register={{ ...register("password") }}
          >
            <div
              className="text-lg absolute top-8 right-3 cursor-pointer select-none"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? (
                <span className="text-myGreen">Hide</span>
              ) : (
                <span className="text-yellow-600">Show</span>
              )}
            </div>
          </InputBox>
          {/* set up reChaptcha */}
          <div></div>
          <FilledBtn className="bg-myGreen text-white py-1.5 mt-2 hover:bg-myGreen/80 active:bg-myGreen uppercase rounded-none flex justify-center  items-center">
            {loading ? (
              <span>
                <ImSpinner9 className="animate-spin duration-100 text-xl " />
              </span>
            ) : (
              "Login"
            )}
          </FilledBtn>
        </form>
        <div className="flex gap-2 mt-3 justify-center">
          <p>New to Nexus?</p>{" "}
          <Link to={"/auth/signup"}>
            <span className="text-myGreen underline">Create new account</span>
          </Link>
        </div>
      </div>
      <p className="px-10 text-center -mt-4 text-sm">
        {" "}
        By proceeding, you agree to Terms of Use and Privacy Policy of{" "}
        <span className="font-bold text-myGreen">Nexus</span>
      </p>
    </div>
  );
}

export default Login;
