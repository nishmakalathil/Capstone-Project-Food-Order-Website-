import React from "react";
import { useLocation, Link } from "react-router-dom"; // Use Link from react-router-dom

function SearchResults() {
  const location = useLocation();
  const { results = [] } = location.state || {}; // Default to empty array if no results

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">Search Results</h1>

      {/* Check if results are empty */}
      {results.length === 0 ? (
        <p>No results found for your search. Please try again with a different query.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result._id} className="border rounded-lg p-4 shadow-md">
              {/* Display product image */}
              {result.image && (
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              {/* Display product name and price */}
              <h2 className="font-semibold text-lg">{result.name}</h2>
              <p className="text-gray-600">{result.description}</p>
              <p className="text-xl font-bold mt-2">${result.price}</p>

              {/* Use Link to navigate to product details page */}
              <Link
                to={`/menu-items/details/${result._id}`} // This will navigate to /menu-items/details/:id
                className="text-pink-500 mt-4 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
