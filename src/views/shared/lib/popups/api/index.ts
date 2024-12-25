import { api } from '@/shared/api';

export async function getDataPopupUrl(action: string): Promise<any> {
  try {
    return await api.get(action);
  } catch (error) {
    console.error(error)
  }
}
