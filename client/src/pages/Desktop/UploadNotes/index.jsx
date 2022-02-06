import './style.less';
import { Upload, notification } from 'antd';
import CircleButton from 'components/Circle/CircleButton';
import OcrReader from 'components/OcrReader';
import Layout from 'containers/Layout';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadNotes = () => {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const [ocrData, setOcrData] = useState('');

  const onReadOcrData = (ocrData) => {
    setOcrData(ocrData);
  };

  const onRemoveClicked = () => {
    setOcrData('');
  };

  return (
    <Layout>
      <div className="square">
        <h1>Upload Notes</h1>
        {fileList.length === 0 && (
          <Upload
            fileList={fileList}
            onChange={({ file }) => {
              setFileList([{ ...file.originfileObj, name: file.name }]);
            }}
            maxCount={1}
            showUploadList={{ showDownloadIcon: false, showPreviewIcon: false, showRemoveIcon: false }}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
          >
            <button type="button" className="upload-btn">
              <UploadOutlined className="upload-icon" />
              <p>Upload your notes!</p>
            </button>
          </Upload>
        )}
        {fileList.length !== 1 && (
          <>
            <OcrReader
              ocrData={ocrData}
              setOcrData={setOcrData}
              onReadOcrData={onReadOcrData}
              onRemoveClicked={onRemoveClicked}
            />

            <div className="button-group">
              <button type="button" onClick={() => navigate('/')}>
                Back
              </button>
              <CircleButton
                onclick={() => {
                  if (fileList.length === 0) {
                    notification.open({
                      message: 'Please upload a file to start.',
                    });
                  } else {
                    navigate('/lobby');
                  }
                }}
                text="Start"
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default UploadNotes;
