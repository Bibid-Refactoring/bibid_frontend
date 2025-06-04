// util/cloudinary.js
const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD;
export function makeBannerUrl(opts) {
    // publicIds[0]만 사용해서 URL을 단일히 리턴
    const publicId = Array.isArray(opts.publicIds) && opts.publicIds.length ? opts.publicIds[0] : '';
    if (!publicId) return '';
    // f_auto, q_auto 같은 옵션만 써서 최적화 URL을 리턴
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/${publicId}.jpg`;
}
