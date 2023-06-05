import { parse } from 'cookie';
import Link from 'next/link';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import useSWR from 'swr';
import Balance from '../Balance';
import SignIn from '../SignIn';
import ThemeButton from '../molecules/ThemeButton';

const Logo = () => (
  <svg
    width="102"
    height="24"
    viewBox="0 0 102 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.92005 4.48C4.24005 4.47997 4.76005 11.9601 0.800049 11.96C4.76005 11.96 4.24004 19.4401 7.92004 19.44C10.24 19.44 9.81121 15.7999 12 15.7999C14.1889 15.7999 13.84 19.44 16.16 19.44C19.84 19.4401 19.32 11.96 23.28 11.96C19.32 11.9601 19.84 4.47997 16.16 4.48C13.84 4.48002 14.1889 8.12012 12 8.12012C9.81121 8.12012 10.24 4.48002 7.92005 4.48Z"
      stroke="#3B81F5"
      strokeWidth="2"
    />
    <path
      d="M12.04 4.24C8.12005 4.24 8.20005 11.96 0.800049 11.96C8.20005 11.96 8.12005 19.68 12.04 19.68C15.96 19.68 15.88 11.96 23.28 11.96C15.88 11.96 15.96 4.24 12.04 4.24Z"
      stroke="#3B81F5"
      strokeOpacity="0.5"
      strokeWidth="2"
    />
    <path
      d="M34.6199 18.15C33.9199 18.15 33.3049 18.02 32.7749 17.76C32.2549 17.49 31.8499 17.115 31.5599 16.635C31.2799 16.145 31.1399 15.57 31.1399 14.91V10.14C31.1399 9.47 31.2799 8.895 31.5599 8.415C31.8499 7.935 32.2549 7.565 32.7749 7.305C33.3049 7.035 33.9199 6.9 34.6199 6.9C35.3299 6.9 35.9399 7.035 36.4499 7.305C36.9699 7.565 37.3749 7.94 37.6649 8.43C37.9549 8.91 38.0999 9.48 38.0999 10.14H36.2099C36.2099 9.62 36.0699 9.225 35.7899 8.955C35.5199 8.685 35.1299 8.55 34.6199 8.55C34.1099 8.55 33.7149 8.685 33.4349 8.955C33.1549 9.225 33.0149 9.62 33.0149 10.14V14.91C33.0149 15.42 33.1549 15.815 33.4349 16.095C33.7149 16.365 34.1099 16.5 34.6199 16.5C35.1299 16.5 35.5199 16.365 35.7899 16.095C36.0699 15.815 36.2099 15.42 36.2099 14.91H38.0999C38.0999 15.56 37.9549 16.13 37.6649 16.62C37.3749 17.11 36.9699 17.49 36.4499 17.76C35.9399 18.02 35.3299 18.15 34.6199 18.15Z"
      fill="currentColor"
    />
    <path
      d="M40.149 18V7.05H42.024V9.75L41.979 11.325H42.489L41.934 11.76C41.944 11.1 42.154 10.575 42.564 10.185C42.974 9.795 43.519 9.6 44.199 9.6C45.009 9.6 45.654 9.87 46.134 10.41C46.624 10.95 46.869 11.675 46.869 12.585V18H44.994V12.81C44.994 12.3 44.864 11.91 44.604 11.64C44.344 11.36 43.984 11.22 43.524 11.22C43.054 11.22 42.684 11.36 42.414 11.64C42.154 11.92 42.024 12.32 42.024 12.84V18H40.149Z"
      fill="currentColor"
    />
    <path
      d="M51.5732 18.15C50.7332 18.15 50.0682 17.915 49.5782 17.445C49.0982 16.965 48.8582 16.34 48.8582 15.57C48.8582 15.03 48.9832 14.565 49.2332 14.175C49.4832 13.785 49.8382 13.485 50.2982 13.275C50.7682 13.055 51.3182 12.945 51.9482 12.945H53.9582V12.36C53.9582 11.96 53.8332 11.655 53.5832 11.445C53.3432 11.225 52.9832 11.115 52.5032 11.115C52.0632 11.115 51.7082 11.2 51.4382 11.37C51.1782 11.54 51.0382 11.78 51.0182 12.09H49.2182C49.2582 11.34 49.5682 10.74 50.1482 10.29C50.7382 9.83 51.5282 9.6 52.5182 9.6C53.5682 9.6 54.3832 9.845 54.9632 10.335C55.5432 10.825 55.8332 11.515 55.8332 12.405V18H54.0032V16.425H53.7032L54.0332 16.155C54.0332 16.565 53.9332 16.92 53.7332 17.22C53.5332 17.51 53.2482 17.74 52.8782 17.91C52.5082 18.07 52.0732 18.15 51.5732 18.15ZM52.1732 16.62C52.7232 16.62 53.1582 16.485 53.4782 16.215C53.7982 15.945 53.9582 15.585 53.9582 15.135V14.16H52.0382C51.6282 14.16 51.3032 14.275 51.0632 14.505C50.8232 14.725 50.7032 15.02 50.7032 15.39C50.7032 15.76 50.8282 16.06 51.0782 16.29C51.3382 16.51 51.7032 16.62 52.1732 16.62Z"
      fill="currentColor"
    />
    <path
      d="M58.4373 18V9.75H60.2673V11.415H60.7773L60.2223 11.865C60.2223 11.165 60.4273 10.615 60.8373 10.215C61.2573 9.805 61.8273 9.6 62.5473 9.6C63.3873 9.6 64.0423 9.87 64.5123 10.41C64.9823 10.95 65.2173 11.705 65.2173 12.675V13.455H63.3423V12.765C63.3423 12.255 63.2123 11.87 62.9523 11.61C62.6923 11.35 62.3223 11.22 61.8423 11.22C61.3523 11.22 60.9723 11.37 60.7023 11.67C60.4423 11.97 60.3123 12.395 60.3123 12.945V18H58.4373Z"
      fill="currentColor"
    />
    <path
      d="M71.3015 18C70.5315 18 69.9165 17.78 69.4565 17.34C69.0065 16.89 68.7815 16.285 68.7815 15.525V11.445H66.5015V9.75H68.7815V7.425H70.6715V9.75H73.9565V11.445H70.6715V15.48C70.6715 15.72 70.7365 15.92 70.8665 16.08C71.0065 16.23 71.1965 16.305 71.4365 16.305H73.8815V18H71.3015Z"
      fill="currentColor"
    />
    <path
      d="M79.5306 18.15C78.8306 18.15 78.2156 18.02 77.6856 17.76C77.1656 17.49 76.7606 17.115 76.4706 16.635C76.1906 16.145 76.0506 15.57 76.0506 14.91V10.14C76.0506 9.47 76.1906 8.895 76.4706 8.415C76.7606 7.935 77.1656 7.565 77.6856 7.305C78.2156 7.035 78.8306 6.9 79.5306 6.9C80.2406 6.9 80.8506 7.035 81.3606 7.305C81.8806 7.565 82.2856 7.935 82.5756 8.415C82.8656 8.895 83.0106 9.47 83.0106 10.14H81.1206C81.1206 9.62 80.9806 9.225 80.7006 8.955C80.4306 8.685 80.0406 8.55 79.5306 8.55C79.0206 8.55 78.6256 8.685 78.3456 8.955C78.0656 9.225 77.9256 9.615 77.9256 10.125V14.91C77.9256 15.42 78.0656 15.815 78.3456 16.095C78.6256 16.375 79.0206 16.515 79.5306 16.515C80.0406 16.515 80.4306 16.375 80.7006 16.095C80.9806 15.815 81.1206 15.42 81.1206 14.91V13.695H79.2606V12.075H83.0106V14.91C83.0106 15.57 82.8656 16.145 82.5756 16.635C82.2856 17.115 81.8806 17.49 81.3606 17.76C80.8506 18.02 80.2406 18.15 79.5306 18.15Z"
      fill="currentColor"
    />
    <path
      d="M85.1197 18V7.05H88.7647C89.4947 7.05 90.1297 7.19 90.6697 7.47C91.2197 7.75 91.6447 8.145 91.9447 8.655C92.2447 9.155 92.3947 9.745 92.3947 10.425C92.3947 11.095 92.2397 11.685 91.9297 12.195C91.6297 12.705 91.2097 13.1 90.6697 13.38C90.1297 13.66 89.4947 13.8 88.7647 13.8H86.9947V18H85.1197ZM86.9947 12.15H88.7647C89.2847 12.15 89.6997 11.99 90.0097 11.67C90.3297 11.35 90.4897 10.935 90.4897 10.425C90.4897 9.905 90.3297 9.49 90.0097 9.18C89.6997 8.86 89.2847 8.7 88.7647 8.7H86.9947V12.15Z"
      fill="currentColor"
    />
    <path
      d="M96.5139 18V8.745H93.6489V7.05H101.269V8.745H98.4039V18H96.5139Z"
      fill="currentColor"
    />
  </svg>
);

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: credits, isLoading } = useSWR('/api/remaining', fetcher);
  let creditsRemaining = null;

  const [remainingGenerations, setRemainingGenerations] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookies = parse(document.cookie);

      if (!cookies.chart_generations) {
        document.cookie = `chart_generations=3;path=/;max-age=${
          60 * 60 * 24 * 7
        };samesite=lax`;
      }

      const interval = setInterval(() => {
        const newGenerations = parseInt(
          parse(document.cookie).chart_generations,
          10
        );
        if (newGenerations !== remainingGenerations) {
          setRemainingGenerations(newGenerations);
        }
      }, 1000); // check every second

      return () => clearInterval(interval); // cleanup on component unmount
    }
  }, [remainingGenerations]);

  console.log('credits: ' + credits);
  if (credits?.remainingGenerations != null) {
    creditsRemaining = credits?.remainingGenerations;
  } else {
    creditsRemaining = remainingGenerations;
  }

  return (
    <main className="h-[calc(100vh-48px)]">
      <nav className="w-full flex items-center justify-between h-12 px-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center space-x-2">
          {creditsRemaining !== undefined && (
            <Balance
              creditsRemaining={creditsRemaining}
              creditsLoading={isLoading}
            />
          )}
          <ThemeButton />
          <SignIn />
        </div>
      </nav>
      <div className="font-normal p-8 h-full bg-white dark:bg-black overflow-y-auto">
        {children}
      </div>
    </main>
  );
};
