import { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAuth } from "../hooks/Auth";

const RequestHelpPage = () => {
    const [message, setMessage] = useState("");
    const { latitude, longitude } = useGeolocation();
    const { token } = useAuth();

    const handleSubmit = () => {
        if (!token || !latitude || !longitude)
            return alert("Please login and allow location access");

        fetch("/api/request-help", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                latitude,
                longitude,
                token,
            }),
        });
    };

    return (
        <div>
            <h1>Do you need help?</h1>
            <h3>Message</h3>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="write your whereabouts..."
            ></textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default RequestHelpPage;
