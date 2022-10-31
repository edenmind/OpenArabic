import React, { Fragment } from 'react'

export const TextListHeadingCategory = (properties) => {
  return (
    <Fragment>
      <h2>{properties.heading}</h2>
      <h4>{properties.subHeading}</h4>
    </Fragment>
  )
}
