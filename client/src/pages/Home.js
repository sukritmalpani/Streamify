import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
// import { PageTitle, Footer } from "@/widgets/layout";
import { PageTitle } from "../widgets/layout";
import { FeatureCard, TeamCard } from "../widgets/cards";
import { featuresData, teamData, contactData } from "../data";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";

export function Home() {
    const [formData, setFormData] = useState({ username: "", link: "", email: "" })
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        const userData = localStorage.getItem("user");
        const user = JSON.parse(userData)
        const { email } = user;
        e.preventDefault();
        if (formData.username == "" || formData.link == "" || formData.email == "") {
            toast.error("All Fields are required");
            return;
        }
        else if (formData.email != email) {
            toast.error("Please login using the email to submit");
            return;
        }
        const response = await fetch('http://localhost:5000/pubrequest', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: formData.username, link: formData.link, email: formData.email })
        })
        const data = await response.json();
        if (data?.success) {
            toast.success(data.message);
        }
        else if (!data?.success) {
            toast.warning(data.message);
        }
        else {
            toast.error(data.message);
        }
    }
    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="relative bg-[#44455B] flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('https://freerangestock.com/sample/137549/streaming-media--video-streaming--live-streaming.jpg')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black text-5xl"
                            >
                                Your story starts Here
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">

                                Welcome to our vibrant world of live streaming entertainment! Get ready to embark on an immersive journey where creativity knows no bounds and connections are forged in real time.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="mt-32 bg-gray-50 px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 h-44 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuresData.map(({ color, title, icon, description }) => (
                            <FeatureCard
                                key={title}
                                color={color}
                                title={title}
                                icon={React.createElement(icon, {
                                    className: "w-5 h-5 text-white",
                                })}
                                description={description}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-4 pt-8 pb-8">
                <div className="container mx-auto">
                    <PageTitle heading="Here is our Team">
                        We are passionate about delivering the best live streaming experience, showcasing a diverse range of content that caters to every interest and passion.
                    </PageTitle>
                    <div className="mt-12 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-3 xl:grid-cols-3">
                        {teamData.map(({ img, name, position, socials }) => (
                            <TeamCard
                                key={name}
                                img={img}
                                name={name}
                                position={position}
                                socials={
                                    <div className="flex items-center gap-2">
                                        {socials.map(({ color, name }) => (
                                            <IconButton key={name} color={color} variant="text">
                                                <i className={`fa-brands text-lg fa-${name}`} />
                                            </IconButton>
                                        ))}
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="relative bg-blue-gray-50/50 py-12 px-4">
                <div className="container mx-auto">
                    <PageTitle heading="Show your live performance by connecting to Peoples">
                        There is something about a live performance that you just cannot replicate anywhere else. Live streaming has been wonderful but it's just not same as sitting there and experiencing that electricity, with a group of other people that you don't even know and all being brought together.<br></br>
                        <b>--Carrie Hope Fletcher</b>
                    </PageTitle>
                    <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {contactData.map(({ title, icon, description }) => (
                            <Card
                                key={title}
                                color="transparent"
                                shadow={false}
                                className="text-center text-blue-gray-900"
                            >
                                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                                    {React.createElement(icon, {
                                        className: "w-5 h-5",
                                    })}
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {title}
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500">
                                    {description}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                    <PageTitle heading="Ready to showcase your live-streaming Talent to the world">
                        Complete this form and we will get back to you in 24 hours.
                    </PageTitle>
                    <form className="mx-auto mt-12 max-w-3xl text-center">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Username
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Username" onChange={handleChange}
                                    name="username"
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Social Media Link
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Social Media Link"
                                    onChange={handleChange}
                                    name="link"
                                    value={formData.link}
                                    required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="abc@gmail.com"
                                    onChange={handleChange}
                                    name="email"
                                    value={formData.email}
                                    required />
                            </div>
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                    </form >
                </div >
            </section >
            <div className="bg-blue-gray-50/50">
                <Footer />
            </div>
        </>
    );
}

export default Home;
