import React, { useState } from 'react';
import './WordProcessor.css'; // Import the CSS file
import axios from 'axios'; // For making the API call
import Cookies from 'js-cookie'

const WordProcessor = () => {
  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const [error, setError] = useState(''); // To capture error messages
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  
  const handleBold = () => {
    setBold(!bold);
  };

  const handleItalic = () => {
    setItalic(!italic);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
        const authToken = Cookies.get('authToken'); // Make sure token exists
        if (!authToken) throw new Error("No auth token found!");

        const response = await axios.post(
            'https://editor-app-backend-1.onrender.com/api/save',
            { text },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.fileId) {
            setSuccessMessage('Letter saved to Google Drive!');
        } else {
            setError('Failed to save letter.');
        }
    } catch (error) {
        console.error('Error saving letter:', error);
        setError(error.response?.data?.message || 'An error occurred while saving the letter.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="word-processor-container">
      <h1 className="word-processor-title">Simple Word Processor</h1>

      {/* Toolbar with buttons for formatting */}
      <div className="toolbar">
        <button
          onClick={handleBold}
          style={{ fontWeight: bold ? 'bold' : 'normal' }}
        >
          Bold
        </button>
        <button
          onClick={handleItalic}
          style={{ fontStyle: italic ? 'italic' : 'normal' }}
        >
          Italic
        </button>
      </div>

      {/* Textarea for input */}
      <textarea
        value={text}
        onChange={handleChange}
        className="textarea"
        style={{
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
        }}
      />

      {/* Display formatted text */}
      <div className="preview-container">
        <h3>Preview:</h3>
        <p
          className="preview-text"
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
          }}
        >
          {text}
        </p>
      </div>

      {/* Display error or success messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Save button */}
      <div className="save-container">
        <button onClick={handleSave} className="save-button" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save to Google Drive'}
        </button>
      </div>
    </div>
  );
};

export default WordProcessor;
