import { Link, Stack, Button } from '@mui/material'
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
      {packageJson.displayName} {packageJson.version}. Copyright © {getHijriYear()} {packageJson.author}.
      <p>
        <Link href="/privacy">Privacy</Link>
        {' . '}
        <Link href="https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/LICENSE">License</Link>
        {' . '}
        <Link href="https://github.com/edenmind/OpenArabic/issues">Issues</Link>
        {' . '}
        <Link href="https://github.com/edenmind/OpenArabic/discussions">Discussions</Link>
      </p>
    </div>
  )
}

export default Footer
