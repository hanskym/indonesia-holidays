import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getAvailableYears } from '@/lib/fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentYear = new Date().getFullYear();
  const availableYears = await getAvailableYears();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/year`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  if (availableYears.status !== 'OK') {
    return staticEntries;
  }

  const yearEntries = availableYears.data.map((year) => ({
    url: `${siteConfig.url}/year/${year}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: year >= currentYear ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...yearEntries];
}
