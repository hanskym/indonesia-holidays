import Image from 'next/image';

import { HolidayEntry } from '@/lib/types';

const images = {
  wait: '/assets/wait.webp',
  wait2: '/assets/wait2.webp',
  wait3: '/assets/wait3.webp',
  holiday: '/assets/holiday.webp',
  holiday2: '/assets/holiday2.webp',
  holiday3: '/assets/holiday3.webp',
};

type ImageType = 'wait' | 'wait2' | 'wait3' | 'holiday' | 'holiday2' | 'holiday3';

const getRandomImage = (type: ImageType) => {
  const filteredImages = Object.keys(images).filter((key) => key.includes(type)) as ImageType[];

  return images[filteredImages[Math.floor(Math.random() * filteredImages.length)]];
};

interface ImageDisplayProps {
  todayHoliday?: HolidayEntry;
  isWeekend?: boolean;
}

export default function ImageDisplay({ todayHoliday, isWeekend = false }: ImageDisplayProps) {
  const imageSrc = todayHoliday || isWeekend ? getRandomImage('holiday') : getRandomImage('wait');

  const altText = todayHoliday ? 'Holiday image' : isWeekend ? 'Weekend image' : 'Waiting image';

  return (
    <div className="relative aspect-video">
      <Image
        className="size-full object-fill"
        src={imageSrc}
        width={420}
        height={235}
        alt={altText}
        unoptimized
      />
    </div>
  );
}
