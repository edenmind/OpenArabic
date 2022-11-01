const SITE_URL = 'https://web.openarabic.io/texts/'

export const generateLinkToPostOnTwitter = (id) => {
  return `https://twitter.com/intent/tweet?url=${SITE_URL + id}`
}

export const generateLinkToPostOnFacebook = (id) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${SITE_URL + id}`
}
