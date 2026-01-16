type LogLevel = 'debug' | 'warn' | 'error';

const isEnabled = (scope?: string): boolean => {
  
  const dev = import.meta?.env?.DEV === true;
  const flagAll = typeof window !== 'undefined' && window.localStorage?.getItem('debug') === '1';
  const flagScope = scope && typeof window !== 'undefined' && window.localStorage?.getItem(`debug:${scope}`) === '1';
  return Boolean(dev || flagAll || flagScope);
};

const log = (level: LogLevel, scope: string, ...args: unknown[]) => {
  if (!isEnabled(scope)) return;
  const prefix = `[${scope}]`;
  (console as any)[level]?.(prefix, ...args);
};

export const logger = {
  debug: (scope: string, ...args: unknown[]) => log('debug', scope, ...args),
  warn: (scope: string, ...args: unknown[]) => log('warn', scope, ...args),
  error: (scope: string, ...args: unknown[]) => log('error', scope, ...args),
};

export default logger;


