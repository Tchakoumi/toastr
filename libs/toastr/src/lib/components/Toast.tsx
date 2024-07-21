import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { useCallback, useEffect, useRef, useState } from 'react';
import ToastrAlert from './ToastrAlert';
import { isCustomContent } from './toastUtils';
import { useToastr } from './toastrContext';
import { CustomNotification, IToast, Notification } from './types';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(50%, 0px) ;
  }
  100% {
    opacity: 1;
    transform: translate(0,0);
  }
`;

export const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translate(0,0);
  }
  100% {
    opacity: 0;
    transform: translate(50%, 0px);
  }
`;

export const ANIMATION_TIMEOUT = 200; //0.2s

const Toast = ({
  content,
  onClose,
  clearAll,
}: {
  content: Notification;
  onClose: () => void;
  clearAll: boolean;
}) => {
  const { globalConfigs } = useToastr();
  const toastTimeout =
    content.timeout ??
    (globalConfigs.timeout === 'infinite'
      ? 'infinite'
      : globalConfigs.timeout > 1000
      ? globalConfigs.timeout - 1000
      : globalConfigs.timeout);
  const touchStartXRef = useRef<number | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchCurrentX = e.targetTouches[0].clientX;
      const moveX = touchCurrentX - touchStartXRef.current;
      setTranslateX(moveX);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(translateX) > 100) {
      // You can adjust the swipe threshold as needed
      onClose();
    } else {
      setTranslateX(0);
    }
    touchStartXRef.current = null;
  };

  const [, setTimeLeft] = useState<number>(
    toastTimeout !== 'infinite' ? toastTimeout : 0
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const pauseOnHover = () => {
    if (toastTimeout !== 'infinite') {
      setIsPaused(true);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    }
  };

  const unpauseToast = useCallback(() => {
    if (toastTimeout !== 'infinite') {
      setIsPaused(false);
      // restart the countdown after the user leaves the toast
      if (
        content.restartTimeoutAferHover ??
        globalConfigs.restartTimeoutAferHover
      )
        setTimeLeft(toastTimeout);
    }
  }, [
    content.restartTimeoutAferHover,
    globalConfigs.restartTimeoutAferHover,
    toastTimeout,
  ]);

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, ANIMATION_TIMEOUT);
  }, [onClose]);

  useEffect(() => {
    if (!isPaused && toastTimeout !== 'infinite') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleClose();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, handleClose, toastTimeout]);

  useEffect(() => {
    if (clearAll) {
      handleClose();
    }
  }, [clearAll, handleClose, onClose]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        typeof document !== 'undefined' &&
        document.visibilityState === 'hidden'
      ) {
        setIsPaused(true);
      } else {
        unpauseToast();
      }
    };

    if (typeof document !== 'undefined')
      document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (typeof document !== 'undefined')
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
    };
  }, [unpauseToast]);

  return (
    <Box
      onMouseEnter={() => (toastTimeout === 'infinite' ? null : pauseOnHover())}
      onMouseLeave={() => (toastTimeout === 'infinite' ? null : unpauseToast())}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        transform: `translateX(${translateX}px)`,
        color: '#fff',
        '& >*':
          content.disableDecendantStyle ?? globalConfigs.disableDecendantStyle
            ? {}
            : {
                padding: { mobile: 1, laptop: 2 },
                borderRadius: { mobile: '6px', laptop: '8px' },
              },
        width: 'fit-content',
        maxWidth: { mobile: '100%', tablet: '70%' },
        animation: `${isVisible ? fadeInUp : fadeOutUp} ${
          ANIMATION_TIMEOUT / 1000
        }s ease-out forwards`,
      }}
    >
      {isCustomContent((content as CustomNotification).content) ? (
        (content as CustomNotification).content
      ) : (
        <ToastrAlert
          {...(content as IToast)}
          message={(content as IToast).message}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default Toast;
