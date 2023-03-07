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

  const gitSha = '@(GIT_SHA)@'
  const appStoreLink = 'https://apps.apple.com/se/app/open-arabic/id1594031029?l=en'
  const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.edenmind.OpenArabic'
  const commitLink = `https://github.com/edenmind/OpenArabic/commit/${gitSha}`
  const licenseLink = 'https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/LICENSE'
  const issuesLink = 'https://github.com/edenmind/OpenArabic/issues'
  const discussionsLink = 'https://github.com/edenmind/OpenArabic/discussions'

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
      <p>
        {packageJson.displayName} {packageJson.version} Commit: <Link href={commitLink}>{gitSha}</Link>
      </p>

      <p>
        <Link href="/privacy">Privacy</Link>
        {' . '}
        <Link href={licenseLink}>License</Link>
        {' . '}
        <Link href={issuesLink}>Issues</Link>
        {' . '}
        <Link href={discussionsLink}>Discussions</Link>
      </p>

      <p>
        Copyright © {getHijriYear()} {packageJson.author}.
      </p>
    </div>
  )
}

export default Footer
