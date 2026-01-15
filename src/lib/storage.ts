export interface UserContext {
  fullName: string;
  email: string;
  situation: string;
  submittedAt: string;
}

const STORAGE_KEY = 'deal_infrastructure_user';

export const saveUserContext = (data: Omit<UserContext, 'submittedAt'>): void => {
  const userContext: UserContext = {
    ...data,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userContext));
};

export const getUserContext = (): UserContext | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserContext;
  } catch {
    return null;
  }
};

export const hasUserContext = (): boolean => {
  return getUserContext() !== null;
};

export const clearUserContext = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
