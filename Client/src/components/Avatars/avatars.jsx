import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./avatars.css";
import "../../assets/StyledBtns.css";
import { useNavigate } from 'react-router-dom';

const Avatars = () => {
    const api = "https://api.multiavatar.com";
    const setAvatarRoute = "http://localhost:3030/api/setAvatar";
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate = useNavigate();


    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            alert("Please select an Avatar for You");
        } else {
            try {
                const user = JSON.parse(localStorage.getItem("user-Details"));
                console.log("User details from local storage:", user); // Debugging step
                if (!user || !user.email) {
                    alert("User not found in local storage. Please log in again.");
                    return;
                }

                const { data } = await axios.post(`${setAvatarRoute}/${user.email}`, {
                    image: avatars[selectedAvatar],
                });

                localStorage.setItem("user-Details", JSON.stringify(data.updatedUser));
                alert("Profile picture updated successfully!");
                navigate("/chat");

            } catch (error) {
                alert("An error occurred while setting the profile picture.");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
                    const base64Image = btoa(
                        new Uint8Array(image.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    data.push(base64Image);
                }
                setAvatars(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='avatar-mainContainer'>
            <div className="title-container">
                <h1>Choose Your Avatar</h1>
            </div>

            <div className='avatars'>
                {avatars.map((avatar, index) => {
                    return (
                        <div
                            key={index}
                            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                            <img
                                src={`data:image/svg+xml;base64,${avatar}`}
                                alt="avatar"
                                onClick={() => setSelectedAvatar(index)}
                            />
                        </div>
                    );
                })}
            </div>

            <div className='Avatar-submit-btn'>
                <button className="button-85" onClick={setProfilePicture}>Set as Profile Picture</button>
            </div>
        </div>
    );
}

export default Avatars;
