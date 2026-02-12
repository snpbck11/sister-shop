import EasyYandexS3 from "easy-yandex-s3";

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_BUCKET
) {
  throw new Error("нет ключей или корзины");
}

export const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  Bucket: process.env.AWS_BUCKET,
  debug: true,
});
