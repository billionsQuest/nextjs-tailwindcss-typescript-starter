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
import { useAuth } from "../../../context/AuthContext";
import { auth } from "../../../../lib/clientApp";
import { useIndexContext } from "../../../context/index.context";
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
  <form onSubmit={onSubmit}>
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      label="Name"
      value={name}
      onChange={(event) => setName(event.target.value)}
      sx={{ mb: 2 }}
    />
    <Button type="submit" variant="contained" fullWidth>
      Save
    </Button>
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
  <form onSubmit={onSubmit}>
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      label="Phone Number"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
      sx={{ mb: 2 }}
    />
    <Button type="submit" variant="contained" fullWidth>
      Send OTP
    </Button>
  </form>
);

interface OTPFormProps {
  onSubmit: () => void;
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
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      label="Phone Number"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
      sx={{ mb: 2 }}
      disabled={true}
    />
    <TextField
      fullWidth
      variant="outlined"
      label="OTP"
      value={otp}
      onChange={(event) => setOtp(event.target.value)}
      onKeyPress={(event) => event.key === "Enter" && onSubmit()}
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={onSubmit}
      sx={{ mb: 1 }}
    >
      Verify OTP
    </Button>
    <Button variant="text" onClick={onResend}>
      Resend OTP
    </Button>
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
        "recaptcha",
        { size: "invisible" },
        auth as Auth
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

  const verifyOtp = async () => {
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
      <Container component="main" maxWidth="xs">
        <Card sx={{ mt: 4 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ padding: "20px" }} variant="h5" component="div">
              {"Enter your name"}
            </Typography>

            <NameForm name={name} setName={setName} onSubmit={handleSaveName} />
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 4 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ padding: "20px" }} variant="h5" component="div">
            {hasFilled ? "Enter the OTP" : "Enter your phone number"}
          </Typography>
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
        </CardContent>
      </Card>
      <div id="recaptcha"></div>
    </Container>
  );
};

export default PhoneLogin;
