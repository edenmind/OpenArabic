import { Link, Stack } from '@mui/material'
import packageJson from '../../package.json'

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
  const hijriDate = new Date().toLocaleDateString('ar-SA-u-ca-islamic-civil', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

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
      {packageJson.displayName} {packageJson.version}. Copyright © {hijriDate} Edenmind. All rights reserved.
    </div>
  )
}

export default Footer
