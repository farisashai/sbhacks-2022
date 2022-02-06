/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { createWorker } from 'tesseract.js';

// OCR Statuses
const STATUSES = {
  IDLE: '',
  FAILED: 'Failed to perform OCR',
  PENDING: 'Processing...',
  SUCCEEDED: 'OCR processing complete',
};

function OcrReader({ selectedImage, onReadOcrData, onRemoveClicked, ocrData, setOcrData }) {
  const [ocrState, setOcrState] = useState(STATUSES.IDLE);
  const worker = createWorker();

  console.log(selectedImage);

  // Process image with OCR
  const readImageText = async () => {
    setOcrState(STATUSES.PENDING);
    try {
      await worker.load();
      // Set the language to recognize
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(selectedImage);
      await worker.terminate();

      onReadOcrData(text);
      setOcrState(STATUSES.SUCCEEDED);
    } catch (err) {
      setOcrState(STATUSES.FAILED);
    }
  };

  // Executed when "Use another image" is selected
  const handleRemoveClicked = () => {
    // setSelectedImage(null);
    onRemoveClicked();
    setOcrState(STATUSES.IDLE);
  };

  return (
    <div>
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="scanned file" />
        </div>
      )}
      <div>
        {selectedImage ? (
          <div className="button-container">
            <button onClick={readImageText}>Process the image with OCR</button>
          </div>
        ) : (
          <>
            <p>Upload an image to process</p>
            <input
              type="file"
              name="ocr-image"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            <p>Supported formats: bmp, jpg, png, pbm.</p>
          </>
        )}
      </div>
      <div className="status">{ocrData}</div>
      <br />
      <div>
        <textarea rows="15" cols="45" name="name" defaultValue={ocrData} onChange={(e) => setOcrData(e.target.value)} />
      </div>
    </div>
  );
}

export default OcrReader;
