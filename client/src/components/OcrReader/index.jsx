/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Spin } from 'antd';

import './style.less';

// OCR Statuses
const STATUSES = {
  IDLE: '',
  FAILED: 'Failed to perform OCR',
  PENDING: 'Processing...',
  SUCCEEDED: 'OCR processing complete',
};

function OcrReader({ selectedImage, onReadOcrData, ocrData, setOcrData }) {
  const [ocrState, setOcrState] = useState(STATUSES.IDLE);
  const worker = createWorker();

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

  return (
    <div className="ocr-reader">
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="scanned file" />
        </div>
      )}
      <div>
        <div className="button-container">
          <button type="button" onClick={readImageText}>
            Process the image with OCR
          </button>
        </div>
      </div>
      <br />
      {ocrState === STATUSES.PENDING && (
        <div>
          <Spin size="large" />
        </div>
      )}
      {ocrData && (
        <div className="textarea">
          <textarea
            style={{ height: '200px' }}
            cols="45"
            name="name"
            value={ocrData || ''}
            onChange={(e) => setOcrData(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default OcrReader;
