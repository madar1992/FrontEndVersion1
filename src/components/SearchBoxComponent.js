import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Import the Search icon from MUI
import TuneIcon from '@mui/icons-material/Tune'; // Import the Tune icon from MUI

const SearchBoxComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ position: 'relative', width: '50%' }}>
        <div
          style={{
            position: 'absolute',
            left: '8px', // Adjust the magnifying glass's position
            top: '50%',
            transform: 'translateY(-50%)', // Vertically center the icon
            color: '#888', // Icon color
          }}
        >
          <SearchIcon /> {/* Add the Search icon here */}
        </div>
        <input
          type="text"
          placeholder="Search for jobs..."
          style={{
            width: 'calc(100% - 32px)', // Adjust width to account for icons
            padding: '8px 32px 8px 32px', // Add padding to the input box
            border: '1px solid #ccc', // Add border for better visibility
            borderRadius: '20px', // Add border radius for rounded corners
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '8px', // Adjust the filter icon's position
            top: '50%',
            transform: 'translateY(-50%)', // Vertically center the icon
            cursor: 'pointer',
            color: '#888', // Icon color
          }}
        >
          <TuneIcon /> {/* Use the Tune icon as the filter icon */}
        </div>
      </div>
    </div>
  );
};

export default SearchBoxComponent;
