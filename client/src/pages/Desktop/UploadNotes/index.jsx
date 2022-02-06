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
        <OcrReader
          ocrData={ocrData}
          setOcrData={setOcrData}
          onReadOcrData={onReadOcrData}
          onRemoveClicked={onRemoveClicked}
        />
        <h1>Upload Notes</h1>
        <Upload
          fileList={fileList}
          onChange={({ file }) => {
            console.log(file);
            setFileList([{ ...file.originfileObj, name: file.name }]);
          }}
          maxCount={1}
          onRemove={() => {
            setFileList([]);
            // TODO: we can't remove files right now
            return true;
          }}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 0);
          }}
        >
          <button className="upload-btn">
            <UploadOutlined className="upload-icon" />
          </button>
        </Upload>

        <div className="button-group">
          <button onClick={() => navigate('/')}>Back</button>
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
      </div>
    </Layout>
  );
};

export default UploadNotes;
