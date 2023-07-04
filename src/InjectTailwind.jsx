import { StyledEngineProvider } from '@mui/material/styles'
// eslint-disable-next-line react/prop-types
export default function InjectTailwind({ children }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
}