import SignIn from "../components/SignIn";
import Background from "../components/background/BackgroundLogin";

export default function LoginPage() {
    return (
        <>
            <Background>
                <SignIn />
            </Background>
        </>
    );
}
