import { useRouter } from "next/router";
import React, { useState } from "react";
import { CricHeroService } from "../../../services/cricheros";

const SearchPage = () => {
  const router = useRouter();

  const [input, setInput] = useState<string>();

  const [tournament, setTournament] = useState([]);

  const handleSubmit = async () => {
    if (input.length == 5) {
      try {
        const getDetails = await CricHeroService.getTournamentDetails(input);
        console.log("success", getDetails);
      } catch (err) {
        console.log("got err", err);
      }
    } else {
    }
  };

  // const handleshowAlltournament = () => {
  //   router.push("/tournaments");
  // };
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Find your tournament
        </h1>
        <div className="flex flex-col items-center space-y-6">
          {/* <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Scan QR Code
          </button> */}

          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <input
                type="text"
                id="code"
                name="code"
                minLength={5}
                maxLength={5}
                pattern="\d{6}"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter tournament code"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className=" bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 self-center"
            >
              Find
            </button>
          </div>
          {/* <button
            onClick={handleshowAlltournament}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
          >
            Show All Tournaments
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
