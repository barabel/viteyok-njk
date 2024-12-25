import { createContext } from 'react';
import { type Localization } from '@/shared/lib/localization';

export const LocaleContext = createContext<Localization | null>(null);
