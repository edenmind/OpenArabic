import React from 'react'
import { Image, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

const Footer = () => {
  const sharedStyle = useSharedStyles(useTheme())

  return (
    <>
      <Text style={sharedStyle.arabicFooter}>سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك</Text>
      <Image source={require('../assets/logo.png')} style={sharedStyle.logoStyle} />
    </>
  )
}

export default Footer
