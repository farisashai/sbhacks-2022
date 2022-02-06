import './style.less';
import { Upload, notification } from 'antd';
import CircleButton from 'components/Circle/CircleButton';
import OcrReader from 'components/OcrReader';
import Layout from 'containers/Layout';
import { UploadOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ocr, shuffleArray } from 'utils/ocr';
import { AppContext } from 'utils/AppContext';

const UploadNotes = () => {
  const { setQuestions } = useContext(AppContext);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const [ocrData, setOcrData] = useState('');

  const onReadOcrData = (ocrDataIn) => {
    setOcrData(ocrDataIn);
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
              setFileList([{ ...file, name: file.name }]);
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
        {fileList.length === 1 && (
          <>
            <OcrReader
              selectedImage={fileList[0].originFileObj}
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
                    if (!ocrData) {
                      notification.open({ message: "Please click 'Process the image with OCR' before contuning." });
                      return;
                    }

                    const questions = ocr(ocrData);
                    const processedQs = [];
                    questions.forEach((question) => {
                      if (!question.question || question.answers.length !== 4) {
                        return;
                      }

                      const correct = question.answers[0];
                      const qs = shuffleArray(question.answers);
                      const correctIdx = qs.findIndex((q) => q === correct);

                      processedQs.push({
                        question: question.question,
                        a: qs[0],
                        b: qs[1],
                        c: qs[2],
                        d: qs[3],
                        answer: ['A', 'B', 'C', 'D'][correctIdx],
                      });
                    });
                    setQuestions(processedQs);
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
