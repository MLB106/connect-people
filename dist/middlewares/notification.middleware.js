"use strict";
// // src/middlewares/notification.middleware.ts
// import type { Request, Response, NextFunction } from 'express';
// /* ---------- Types ---------- */
// interface NotificationData {
//   userId?: string;
//   userEmail?: string;
//   messageId?: string;
//   alertId?: string;
//   alertType?: string;
// }
// type NotificationType = 'newVoiceMessage' | 'newAlert';
// /* ---------- Fonctions de génération (stub) ---------- DECOMMENTER PROCHAINEMENT  */
// // const generateEmailContent = (data: NotificationData, type: NotificationType): string =>
// //   `<p>Notification de type ${type}</p>`;
// // const generatePushContent = (data: NotificationData, type: NotificationType): object =>
// //   ({ title: `Nouvelle ${type}`, body: 'Consultez l’application' });
// /* ---------- Service multi-plateforme (stub) ---------- */
// const sendMultiPlatformNotification = async (
//   data: NotificationData,
//   type: NotificationType
// ): Promise<void> => {
//   // TODO implémenter quand io, sendMail et sendPushNotification seront disponibles
// };
// /* ---------- Middlewares ---------- */
// export const notifyNewVoiceMessage = (
//   req: Request & { user?: any; newMessageId?: string },
//   res: Response,
//   _next: NextFunction
// ): void => {
//   res.on('finish', () => {
//     if (res.statusCode === 200 && req.newMessageId) {
//       sendMultiPlatformNotification(
//         {
//           userId: req.user?.id,
//           userEmail: req.user?.email,
//           messageId: req.newMessageId,
//         },
//         'newVoiceMessage'
//       ).catch(console.error);
//     }
//   });
//   _next();
// };
// // export const notifyNewAlert = (
// //   req: Request & { user?: any; newAlertId?: string },
// //   res: Response,
// //   next: NextFunction
// // ): void => {
// //   res.on('finish', () => {
// //     if (res.statusCode === 200 && req.newAlertId) {
// //       sendMultiPlatformNotification(
// //         {
// //           userId: req.user?.id,
// //           userEmail: req.user?.email,
// //           alertId: req.newAlertId,
// //           alertType: req.body?.alertType,
// //         },
// //         'newAlert'
// //       ).catch(console.error);
// //     }
// //   });
// //   next();
// // };
// export const notifyNewAlert = () => {
//   return (_req: Request, _res: Response, next: NextFunction) => {
//     next();
//   };
// };
//# sourceMappingURL=notification.middleware.js.map