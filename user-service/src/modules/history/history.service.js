import axios from 'axios';

const historyHost = process.env.USER_HISTORY_URL;
const url = `${historyHost}/history`;

const sendEvent = async (data) => {
  try {
    await axios.post(url, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default sendEvent;
