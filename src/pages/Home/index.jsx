import { useState } from "react";
import "./style.scss";

const index = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b5da841288cd54da8e8a13aa1ef57302`;

	const searchLocation = (event) => {
		if (event.key === "Enter" && location.trim() !== "") {
			const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b5da841288cd54da8e8a13aa1ef57302`;

			fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					console.log(data);
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});

			setLocation("");
		}
	};

	return (
		<div className="">
			<div className="container mx-auto bg-blue-800 rounded-3xl w-[50%]">
				<div className="search pt-10 flex justify-center ">
					<input
						className=" rounded-lg w-[65%]"
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onKeyPress={searchLocation}
						placeholder="Enter Location"
						type="text"
					/>
				</div>
				<div className="top">
					<div className="location">
						<p className="text-[24px] text-white pt-[130px] pl-5">
							{data.name}
						</p>
					</div>
					<div className="temp">
						{data.main ? (
							<h1 className="text-[84px] text-white pl-[150px]">
								{data.main.temp.toFixed()}°F
							</h1>
						) : null}
					</div>
					<div className="description">
						{data.weather ? (
							<p className="text-[64px]  text-white flex items-center pl-[250px]">
								{data.weather[0].main}
								<i className="bx bx-cloud text-white text-[90px]"></i>
							</p>
						) : null}
					</div>
				</div>
				{data.name !== undefined && (
					<div className="wrapper flex items-center justify-center">
						<div className="bottom w-[75%]  bg-slate-500  mt-[300px]   gap-x-[100px] flex items-center justify-center py-5 rounded-xl">
							<div className="humidity">
								{data.main ? (
									<p className="bold">{data.main.humidity}%</p>
								) : null}
								<p>Humidity</p>
							</div>
							<div className="wind">
								{data.wind ? (
									<p className="bold">{data.wind.speed.toFixed()} MPH</p>
								) : null}
								<p>Wind Speed</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default index;
