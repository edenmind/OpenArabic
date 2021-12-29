import React from 'react';

function Loader() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            style={{
                margin: 'auto',
                background: 'rgb(255, 255, 255)',
                display: 'block',
                shapeRendering: 'auto',
            }}
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle cx="50" cy="50" r="0" fill="none" stroke="#3e423a" strokeWidth="2">
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="0s"
                ></animate>
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="0s"
                ></animate>
            </circle>
            <circle cx="50" cy="50" r="0" fill="none" stroke="#a4cfbe" strokeWidth="2">
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                ></animate>
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                ></animate>
            </circle>
        </svg>
    );
}

export default Loader;
