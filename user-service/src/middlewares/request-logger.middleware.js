import { queue } from '../modules/queue/queue.service.js';

const resDotJsonInterceptor = (res, json) => (content) => {
  res.locals.contentBody = content;
  res.json = json;
  res.json(content);
};

const getEventType = (method) => {
  switch (method) {
    case 'POST':
      return 'create';
    case 'PUT':
      return 'update';
    default:
      return 'unknown';
  }
};

const getBase64String = (data) => Buffer.from(JSON.stringify(data)).toString('base64');

const getInfo = (req, res) => {
  // ignore password
  const { username, email } = req.body;

  // convert req, res data into base64 string
  const request = getBase64String({ username, email });
  const response = getBase64String(res.locals.contentBody);

  const userId = res.locals.contentBody.id;
  const event = getEventType(req.method);
  const timestamp = new Date().toISOString();

  return {
    event, timestamp, userId, request, response,
  };
};

const requestLoggerMiddleware = async (req, res, next) => {
  res.json = resDotJsonInterceptor(res, res.json);
  res.on('finish', async () => {
    const data = getInfo(req, res);

    await queue.add(data.event, data, { delay: 3000 });
  });

  next();
};

export default requestLoggerMiddleware;
