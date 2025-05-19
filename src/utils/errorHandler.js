const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Not found' });
  };
  
  export default { errorHandler, notFoundHandler };