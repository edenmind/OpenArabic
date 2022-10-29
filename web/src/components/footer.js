import { Link, Stack } from '@mui/material'
import packageJson from '../../package.json'
import { getHijriYear } from '../services/dates.js'

function Footer() {
  const stickyFooterStyle = {
    marginTop: '15rem',
    marginBottom: '3rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  const appStoreLink = 'https://apps.apple.com/se/app/open-arabic/id1594031029?l=en'
  const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.edenmind.OpenArabic'

  // get the hijri date
  return (
    <div style={stickyFooterStyle}>
      <Stack spacing={2} direction="row" style={{ paddingBottom: '15px' }}>
        <Link href={appStoreLink}>
          <img src="/iphone.svg" alt="iPhone" />
        </Link>
        <Link href={googlePlayLink}>
          <img src="/android.svg" alt="Android" />
        </Link>
      </Stack>
      {packageJson.displayName} {packageJson.version}. Copyright © {getHijriYear()} {packageJson.author}.{' '}
      <Link href="https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/LICENSE">MIT License</Link>.
    </div>
  )
}

export default Footer
