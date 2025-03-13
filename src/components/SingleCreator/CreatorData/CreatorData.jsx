import React from "react";
import { useNavigate } from "react-router-dom";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";

const CreatorData = ({ creator, type, data }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="my-5">
        <p className="text-xl mb-4">{type}s</p>
        {data?.length > 0 ? (
          data.slice(0, 4).map((item) => (
            <div
              key={item.id} // Use the correct dynamic ID
              onClick={() =>
                navigate(`/${type}/${item.id}`, {
                  state: { [type]: item }, // Pass the item (e.g., podcast or audiobook) as state
                })
              }
              className="cursor-pointer"
            >
              <SuggestionCard data={item} type={type} />
            </div>
          ))
        ) : (
          <p>No {type}s found</p>
        )}
      </div>
    </div>
  );
};

export default CreatorData;
