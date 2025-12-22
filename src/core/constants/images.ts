import { getPublicUrl } from '@/core/lib/utils'

export const IMAGE_MAPPING: Record<string, string> = {
    'park': getPublicUrl('park.png'),
    'bus': getPublicUrl('bus.png')
}

export const IMAGE_GROUP_TABS: { value: string; label: string }[] = [
    { value: 'logos', label: 'Logos' },
    { value: 'photoanswers', label: 'Photo Answers' },
    { value: 'forms', label: 'Forms' },
];

export const IMAGE_TABS_ALL_VALUE = 'all';


