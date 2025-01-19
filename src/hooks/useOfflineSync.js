import { useState, useEffect } from 'react';
import { offlineManager } from '../utils/offlineManager';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      syncPendingActions();
    }
  }, [isOnline, pendingActions]);

  const syncPendingActions = async () => {
    setIsSyncing(true);
    try {
      await offlineManager.processPendingActions();
      setPendingActions([]);
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const queueAction = async (action) => {
    await offlineManager.queueAction(action);
    setPendingActions(prev => [...prev, action]);
  };

  return {
    isOnline,
    isSyncing,
    pendingActions,
    queueAction
  };
}
