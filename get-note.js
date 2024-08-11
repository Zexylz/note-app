const NetlifyAPI = require('netlify')

exports.handler = async function(event, context) {
  const client = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN)
  const { note } = JSON.parse(event.body)

  try {
    await client.updateSiteBuildSetting({
      site_id: process.env.SITE_ID,
      setting_key: 'LOVE_NOTE',
      value: note
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    console.error('Error updating environment variable:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Failed to update environment variable' })
    }
  }
}
