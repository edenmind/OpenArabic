import * as util from '../services/UtilityService'
import { expect, describe, it } from '@jest/globals'

describe('truncate', () => {
  it('should truncate', () => {
    // Arrange
    const longtText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum bibendum lacus, ut semper neque mattis ut. In metus quam, sollicitudin eget magna non, consectetur tincidunt quam. Ut eget consectetur massa, sit amet porta sapien. Ut eleifend non risus et suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis nulla sed neque bibendum dapibus. Duis gravida sagittis iaculis. Maecenas libero magna, eleifend posuere arcu sit amet, cursus cursus nisl. Aenean vel augue nec neque tincidunt porta. Vivamus pulvinar blandit turpis, vitae euismod nisi imperdiet et. Nunc maximus augue a placerat ullamcorper. Fusce vel blandit lectus. Etiam velit turpis, hendrerit eget semper gravida, fringilla non enim. Mauris scelerisque augue aliquet mauris sodales dapibus. Duis egestas, dui ut fringilla iaculis, ligula sem mattis augue, quis luctus eros nibh vel turpis.'

    // Act
    const truncated = util.truncate(longtText, 150)

    // Assert
    expect(truncated.length).toBe(152)
  })

  it('should not truncate', () => {
    // Arrange
    const shorterText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

    // Act
    const notTruncated = util.truncate(shorterText, 150)

    // Assert
    expect(notTruncated.length).toBe(56)
  })
})

describe('remove linebreaks', () => {
  it('should not contain linebreaks', () => {
    // Arrange
    const stringWithLineBreaks =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      '\r\n' +
      'Suspendisse rutrum bibendum lacus, ut semper neque mattis ut.'

    // Act
    const stringWithOutLineBreaks = util.removeLineBreak(stringWithLineBreaks)

    // Assert
    expect(stringWithOutLineBreaks).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum bibendum lacus, ut semper neque mattis ut.'
    )
  })
})
