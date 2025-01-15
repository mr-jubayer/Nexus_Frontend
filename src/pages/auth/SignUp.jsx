import { Link, useNavigate } from "react-router";
import FilledBtn from "../../components/buttons/FilledBtn";
import InputBox from "../../components/inputs/InputBox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();

  const signUpSubmitHandler = async (userCredetial) => {
    const { password, conPass, email, fullName } = userCredetial;
    if (!password) return;
    if (password !== conPass) return setErr("Confirm password and try again!");
    setLoading(true);
    setFirebaseErr("");
    try {
      const res = await signUpWithEmailAndPassword(email, password);
      await updateProfile(res.user, { displayName: fullName, photoURL: "" });
      reset();
      navigate("/");
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
          <h2 className="text-3xl text-myGreen">Create an Account</h2>
          <p className="mt-1 text-lg">
            To continue to <span className="font-bold ">Nexus</span>
          </p>
        </div>
        {/* social login */}
        <SocialLogin label={"up"} />
        <div className="divider">OR</div>
        {/* email and pass login */}
        <form
          onSubmit={handleSubmit(signUpSubmitHandler)}
          className="flex flex-col gap-3"
        >
          <InputBox
            label={"FullName"}
            name={"name"}
            type={"text"}
            id={"name"}
            required={true}
            register={{ ...register("fullName") }}
          />
          <InputBox
            label={"Email"}
            name={"email"}
            required={true}
            type={"email"}
            id={"email"}
            register={{ ...register("email") }}
          >
            {" "}
            <p className="text-sm text-error mt-1">{firebaseErr} </p>
          </InputBox>
          <InputBox
            label={"Password"}
            name={"password"}
            type={isVisible ? "text " : "password"}
            id={"password"}
            register={{
              ...register("password", {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])(?=.*[0-9])/,
                require: true,
                minLength: 6,
              }),
            }}
          >
            <div className="mt-1 text-error text-sm">
              <p>
                {errors?.password?.type === "minLength" &&
                  "Password must be 6 or more charecter"}{" "}
              </p>
              <p>
                {errors?.password?.type === "require" &&
                  "You have must fillup this field!"}{" "}
              </p>
              <p>
                {errors?.password?.type === "pattern" &&
                  "The password must required at least one uppercase, one lowercase, one disit and a special charecter!"}{" "}
              </p>
            </div>
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

          <InputBox
            label={"Confirm Password"}
            name={"confirm password"}
            type={"password"}
            id={"conPass"}
            register={{ ...register("conPass") }}
          />
          <p className="-mt-2 text-error text-sm">{err} </p>
          {/* set up reChaptcha */}
          <div></div>
          <FilledBtn className="flex justify-center items-center bg-myGreen text-white py-1.5 mt-2 hover:bg-myGreen/80 active:bg-myGreen uppercase rounded-none">
            {loading ? (
              <span>
                <ImSpinner9 className="animate-spin duration-100 text-xl " />
              </span>
            ) : (
              "Resister"
            )}
          </FilledBtn>
        </form>
        <div className="flex gap-2 mt-3 justify-center">
          <p>Already have an account?</p>{" "}
          <Link to={"/auth/login"}>
            <span className="text-myGreen underline">Login</span>
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

export default SignUp;
