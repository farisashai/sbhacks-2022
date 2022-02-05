import './style.less';
import {Upload} from "antd"
import CircleButton from 'components/Circle/CircleButton'
import Layout from 'containers/Layout'
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react'

const UploadNotes = ({ setIndex, back, next }) => {
  const [fileList, setFileList] = useState([])

  return <Layout>
    <div className="square">
        <h1>Upload Notes</h1>
        <Upload
          fileList={fileList}
          onChange={({ file }) => {
            console.log(file)
            setFileList([{...file.originfileObj, name: file.name}])
          }}
          maxCount={1}
          onRemove={() => {
            setFileList([])
            // TODO: we can't remove files right now
            return true;
          }}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
            }, 0);
          }}

          >
          <button className='upload-btn'>
            <UploadOutlined className='upload-icon' />
          </button>
        </Upload>


        <div className="button-group">
              <button onClick={back}>Back</button>
              <CircleButton
                  onclick={next} 
                  text="Start"
              />
          </div>
    </div>
  </Layout>
}

export default UploadNotes;
