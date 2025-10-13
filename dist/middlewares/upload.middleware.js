// src/middlewares/upload.middleware.ts
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
export default upload;
// UTILISATION 
// import upload from '../middlewares/upload.middleware';
// router.post('/avatar', upload.single('file'), (req, res) => {
//   // req.file contient le buffer en mémoire
//   res.json({ ok: true });
// });
//# sourceMappingURL=upload.middleware.js.map