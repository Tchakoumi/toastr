import dismiss from '@iconify/icons-fluent/dismiss-28-filled';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import Toast, { ANIMATION_TIMEOUT } from './Toast';
import { useToastr } from '../context/toastrContext';

const NotificationList: React.FC = () => {
  const { notifications, globalConfigs, clearToast } = useToastr();
  const [shouldClearAll, setShouldClearAll] = useState<boolean>(false);

  function clearAll() {
    setShouldClearAll(true);
    setTimeout(() => {
      setShouldClearAll(false);
    }, ANIMATION_TIMEOUT);
  }

  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'end',
        rowGap: 1,
        alignContent: 'start',
        position: 'absolute',
        right: 0,
        height: 'fit-content',
        backgroundColor: 'transparent',
        zIndex: 1000,
        gridTemplateRows: 'auto 1fr',
        maxHeight: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        px: 0.5,
      }}
    >
      {notifications.length > 0 && !globalConfigs.disableDismissAll && (
        <Tooltip title="Dismiss All" placement="left" arrow>
          <IconButton
            size="small"
            sx={{
              '&.MuiIconButton-root': {
                backgroundColor: '#0000006b',
              },
            }}
            onClick={() => clearAll()}
          >
            <Icon icon={dismiss} color="#fff" fontSize={16} />
          </IconButton>
        </Tooltip>
      )}
      <Box sx={{ display: 'grid', rowGap: 1, alignContent:'start' }}>
        {notifications.map((notification) => {
          const { id } = notification;
          return (
            <Toast
              key={id}
              content={notification}
              clearAll={shouldClearAll}
              onClose={() => clearToast(id)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default NotificationList;
