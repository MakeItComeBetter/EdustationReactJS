import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';

const withWrapperLoading = (InnerComponent) => {

  const EffectLoading = ({loading = false, ...props}) => {

    return (
      <Box sx={{ m: 1, position: 'relative' }}>
        <InnerComponent {...props} />
        {loading && (
          <CircularProgress
            size={15}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    )
    
  }
  return EffectLoading;
}

export default withWrapperLoading;