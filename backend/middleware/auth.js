import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);

    if (!authHeader) {
      console.log('No authorization header');
      return res.status(401).json({ message: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('No token in auth header');
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.userId = decoded.userId;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in auth middleware' });
  }
};

export default auth; 