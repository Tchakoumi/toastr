import success from '@iconify/icons-fluent/checkmark-circle-24-filled';
import dismiss from '@iconify/icons-fluent/dismiss-24-filled';
import info from '@iconify/icons-fluent/info-24-filled';
import warning from '@iconify/icons-fluent/warning-24-filled';
import { Icon, IconifyIcon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { IToast, ToastType } from '../types';

export default function ToastrAlert({
  message,
  handleClose,
  title,
  type = 'success',
  hasIcon = true,
  hasCloseButton = true,
  action,
  actionButton,
  actionText = 'Action',
}: IToast) {
  const toastTypeConfig: Record<
    ToastType,
    {
      icon: IconifyIcon;
      iconColor: string;
      bgColor: string;
      buttonBgColor: string;
    }
  > = {
    success: {
      icon: success,
      iconColor: 'fff',
      bgColor: '#2E8B57',
      buttonBgColor: '#3CBA6B',
    },
    info: {
      icon: info,
      iconColor: '#fff',
      bgColor: '#4682B4',
      buttonBgColor: '#5A9BD5',
    },
    error: {
      icon: warning,
      iconColor: '#fff',
      bgColor: '#B22222',
      buttonBgColor: '#DC4C4C',
    },
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns:
          !hasIcon && !hasCloseButton
            ? '1fr'
            : !hasIcon
            ? '1fr auto'
            : !hasCloseButton
            ? 'auto 1fr'
            : 'auto 1fr auto',
        gap: '8px',
        alignItems: 'start',
        justifyItems: 'start',
        backgroundColor: toastTypeConfig[type].bgColor,
      }}
    >
      {hasIcon && (
        <Icon
          icon={toastTypeConfig[type].icon}
          color={toastTypeConfig[type].iconColor}
          fontSize={20}
        />
      )}
      <Box sx={{ display: 'grid', rowGap: 1.5 }}>
        <Box
          sx={{ display: 'grid', ...(title && message ? { rowGap: 0.5 } : {}) }}
        >
          {title && (
            <Typography
              sx={{
                textWrap: 'wrap',
                fontWeight: 600,
                lineHeight: '20px',
                fontSize: '14px',
              }}
            >
              {title}
            </Typography>
          )}
          <Typography
            sx={{
              fontWeight: 400,
              lineHeight: '20px',
              fontSize: '14px',
            }}
          >
            {message}
          </Typography>
        </Box>
        {actionButton ??
          (action && (
            <Button
              sx={{
                '&.MuiButtonBase-root': {
                  backgroundColor: toastTypeConfig[type].buttonBgColor,
                  width: 'fit-content',
                  minWidth: 'fit-content',
                },
              }}
              variant="text"
              color="inherit"
              size="small"
              onClick={action}
            >
              {actionText}
            </Button>
          ))}
      </Box>
      {hasCloseButton && (
        <Icon icon={dismiss} onClick={handleClose} color="#fff" fontSize={20} />
      )}
    </Box>
  );
}
