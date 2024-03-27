import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import {
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
  UserCredential,
  Auth,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../../lib/clientApp";
import { useIndexContext } from "../../context/index.context";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

interface NameFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const NameForm: React.FC<NameFormProps> = ({ onSubmit, name, setName }) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    <div>
      {/* <label
        htmlFor="phone"
        className="block text-sm font-medium text-neutral-600"
      >
        "Phone Number"
      </label> */}
      <div className="mt-1">
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </div>
  </form>
);

interface PhoneNumberFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onSubmit,
  phone,
  setPhone,
}) => (
  <form action="#" className="space-y-6" onSubmit={onSubmit}>
    <div>
      {/* <label
        htmlFor="phone"
        className="block text-sm font-medium text-neutral-600"
      >
        "Phone Number"
      </label> */}
      <div className="mt-1">
        <input
          id="phone"
          name="phone"
          type="text"
          autoComplete="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Enter mobile number"
          className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Get OTP
      </button>
    </div>
  </form>
);

interface OTPFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

const OTPForm: React.FC<OTPFormProps> = ({
  onSubmit,
  onResend,
  otp,
  setOtp,
  phone,
  setPhone,
}) => (
  <>
    <form action="#" className="space-y-6" onSubmit={onSubmit}>
      <div>
        {/* <label
          htmlFor="phone"
          className="block text-sm font-medium text-neutral-600"
        >
          "Phone Number"
        </label> */}
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="text"
            autoComplete="phone"
            disabled={true}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Your phone number"
            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
          />
        </div>
      </div>
      <div>
        {/* <label
          htmlFor="OTP"
          className="block text-sm font-medium text-neutral-600"
        >
          "OTP"
        </label> */}
        <div className="mt-1">
          <input
            id="OTP"
            name="OTP"
            type="number"
            autoComplete="phone"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="Enter OTP"
            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            placeholder="Your password"
            className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="remember-me"
            className="block ml-2 text-sm text-neutral-600"
          >
            {" "}
            Remember me{" "}
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={onResend}
          >
            {" "}
            Resend OTP
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </form>
  </>
);

const PhoneLogin: React.FC = () => {
  const [phone, setPhone] = useState<string>("+91");
  const [hasFilled, setHasFilled] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { currentUser, logout, handleAddCurrentUser } = useAuth();

  const { handleLoading } = useIndexContext();

  const firestore = getFirestore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !currentUser) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth as Auth,
        "recaptcha",
        { size: "invisible" }
      );
    }
  }, []);

  const checkIfUserExists = async (uid: string) => {
    try {
      const userRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(userRef);

      return docSnap.exists(); // Returns true if the document exists, false otherwise
    } catch (error) {
      console.error("Error checking document: ", error);
      return false; // Handle the error as appropriate for your application
    }
  };

  const doRedirection = async (uid: string) => {
    const user = await checkIfUserExists(uid);
    if (user) {
      router.push("/");
    } else {
    }
  };

  useEffect(() => {
    if (currentUser) {
      doRedirection(currentUser.uid);
    }
  }, [currentUser]);

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    handleLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult: ConfirmationResult =
        await signInWithPhoneNumber(auth as Auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setHasFilled(true);
      setMessage("OTP sent successfully.");
      handleLoading(false);
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
      handleLoading(false);
    }
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendOTP(phone);
  };

  const handleResend = () => {
    sendOTP(phone);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      handleLoading(true);
      try {
        const confirmationResult = window.confirmationResult;
        const result: UserCredential = await confirmationResult.confirm(otp);
        handleAddCurrentUser(result.user);

        const userUid = await checkIfUserExists(result.user.uid);

        if (!userUid) {
          const userRef = doc(firestore, "users", result.user.uid);
          setDoc(userRef, {
            phone: result.user.phoneNumber,
            // any other user info
          });
        }
        setMessage("User signed in successfully.");
        handleLoading(false);
      } catch (error) {
        setMessage("Invalid OTP. Please try again.");
        handleLoading(false);
      }
    }
  };

  const handleSaveName = async (e: any) => {
    e.preventDefault();
    if (currentUser) {
      const userRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userRef, { name: name });

      console.log("name saved successfully");
    } else {
      console.log("you are not logged in");
    }
  };

  if (currentUser) {
    return (
      <section className="">
        <div className="items-center px-5 py-12 lg:px-20">
          <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
              <div className="mt-6 text-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
                  <h2 className="mt-6 text-3xl font-bold text-center text-neutral-600">
                    Create your Account
                  </h2>
                </div>

                <NameForm
                  name={name}
                  setName={setName}
                  onSubmit={handleSaveName}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
          <div className="mt-8">
            <div className="mt-6 text-center">
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
                <h2 className="mt-6 text-3xl font-bold text-center text-neutral-600">
                  Login or Join the Action!
                </h2>
              </div>
              {hasFilled ? (
                <OTPForm
                  onSubmit={verifyOtp}
                  onResend={handleResend}
                  otp={otp}
                  setOtp={setOtp}
                  phone={phone}
                  setPhone={setPhone}
                />
              ) : (
                <PhoneNumberForm
                  onSubmit={handleSend}
                  phone={phone}
                  setPhone={setPhone}
                />
              )}
              {message && (
                <Alert
                  severity={message.startsWith("Failed") ? "error" : "success"}
                >
                  {message}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha"></div>
    </section>
  );
};

export default PhoneLogin;
