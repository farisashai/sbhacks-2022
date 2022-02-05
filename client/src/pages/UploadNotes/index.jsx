import './style.less';
import Header from '../../components/Header'
import {Upload} from "antd"
import CircleButton from '../../components/Circle/CircleButton'
import Layout from '../../containers/Layout'
import { UploadOutlined } from '@ant-design/icons';

const UploadNotes = ({ setIndex }) => {
  return <Layout>
    <div className="square">
        <h1>Upload Notes</h1>
        <Upload>
          <button className='upload-btn'>
            <UploadOutlined className='upload-icon' />
          </button>
        </Upload>
        <div className="button-group">
              <a href="/">Back</a>
              <CircleButton
                  onclick={() => setIndex(index => index + 1)} 
                  text="Start"
              />
          </div>
    </div>
  </Layout>
}

export default UploadNotes;
