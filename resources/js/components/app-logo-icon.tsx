import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{ enableBackground: 'new 0 0 64 64' }} xmlSpace="preserve">
            <path style={{ fill: '#fff' }} d="M7 11h50v38H7z" />
            <path d="M3 3h58v6H48v3H8v24c0 3 3.2 5.5 8 6.9V36h8v8c1.4 0 2.7-.1 4-.2V32h8v10.5c1.4-.4 2.7-.8 4-1.2V28h8v9.2c5-3.5 8-8.2 8-13.2h1v25h-9v3H34v4.5c1.2.7 2 2 2 3.5 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5.8-2.8 2-3.5V52H10c-3.3 0-6-2.7-6-6V9H3V3z" style={{ fill: '#acbdc5' }} />
            <path d="M4 5c0-.6.4-1 1-1h11V0H5C2.2 0 0 2.2 0 5v2c0 2.8 2.2 5 5 5h43V9h13V3h-6c.7.3 1 .7 1 1 0 2.2-14.3 4-32 4C13 8 4 7.1 4 6V5z" style={{ fill: '#597380' }} />
            <path d="M16 0h43c2.8 0 5 2.2 5 5v2c0 2.4-1.7 4.4-4 4.9V46c0 3.3-2.7 6-6 6H44v-4h10c1.1 0 2-.9 2-2V12H44V8h15c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H16V0z" style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: '#314a52' }} />
            <path style={{ fill: '#0779e4' }} d="m48 16-10 1 1.9 2.7-6.2 5-6-2.5-11.9 8.7 2.4 3.2 10.1-7.3 6 2.5 8-6.4 1.7 2.4z" />
        </svg>
    );
}
