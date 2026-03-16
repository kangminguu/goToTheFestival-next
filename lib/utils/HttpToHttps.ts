/**
 * http로 시작하는 이미지 URL을 https로 변환하는 함수
 */
export default function HttpToHttps(url: string) {
    if (url.startsWith("http://")) {
        return url.replace("http://", "https://");
    }

    return url;
}
