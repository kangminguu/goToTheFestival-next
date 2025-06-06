/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            borderRadius: {
                full: '9999px', // 완전 둥근 형태
                tag: '6px',     // 태그 radius
                button: '8px', // 버튼 radius
            },
            boxShadow: {
                window: "5px 5px 30px rgba(0, 0, 0, 0.06)"
            }
        },
        colors: {
            font: {
                primary: '#333333',     // 기본 텍스트
                secondary: '#767676',   // 보조 텍스트
                muted: '#D9D9D9',       // 비활성 텍스트
                inverted: '#ffffff',    // 색상있는 배경 위
                highlight: '#FF4238',   // 강조
                activeButton: '#1D88FF',   // 클릭 가능한 텍스트 버튼
            },
            background: {
                base: '#FFFFFF',
                hover: '#F7F7FB',   // hover 및 activate
                highlight: '#FF4238',   // 강조
                highlightHover: '#E73128'
            },
            border: {
                base: '#EBEBEB',
                activate: '#767676'
            },
        },
        fontFamily: {
            pretendard: ['Pretendard']
        }
    },
    plugins: [],
}

